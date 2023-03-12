import React, {useEffect, useReducer} from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { Snackbar, Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import "../App.css";
import Image from "./img/earth.png";

const ResetComponent = () => {

    const initialState = {
        messages: [],
        snackbarMsg: "",
        gotData: false,
    };
    
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

 useEffect(() => {
     resetData();
    }, []);

const snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
    return;
    }
    setState({ gotData: false });
    }

const resetData = async () => {

    try {
        let response = await fetch("/graphql", {
            method: "POST",
            headers: {
            "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ query: "query { project1_setup {results} }" }),
        });
        setState({ snackbarMsg: "Data Reset Successful", gotData: true });
        let payload = await response.json();

        const resArr = payload.data.project1_setup.results
        .replace(/([.])\s*(?=[A-Z])/g, "$1|")
        .split("|");
        setState({messages: resArr});
        console.log(resArr);
        console.log(state.messages);

    } catch (error) {
        setState({ snackbarMsg: "Data Reset Unsuccessful", gotData: true });
        console.log(error);
    }
};

 return (
 <ThemeProvider theme={theme}>
 <Card className="card">
    <Card className="img"
    style={{justifyContent: "center",
    display: "flex",
    alignContent: "center"}}>
    <Avatar alt="Earth" src={Image}
        sx={{width: "20%", height: "20%"}}/>
    </Card>
 <CardHeader
 title="World Wide Travel Alerts"
 style={{ color: theme.palette.primary.main, textAlign: "center" }}
 />
 <CardContent>
 <br />
 <Typography
 style={{ textAlign: "center", fontSize: 20}}>
 Alert Setup - Details
 </Typography>
 <Typography
 style={{ textAlign: "center", fontSize: 16, color: 'red'}}>
 {
    state.messages.map((item, index) => {
        console.log(item)
        return <div key={index}>{item}</div>;
    })
    }
 </Typography>
 </CardContent>
 </Card>
 <Snackbar
   open={state.gotData}
   message={state.snackbarMsg}
   autoHideDuration={4000}
   onClose={snackbarClose}
   />
 </ThemeProvider>
 );
};
export default ResetComponent;
