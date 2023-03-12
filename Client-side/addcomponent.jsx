import React, {useReducer, useEffect} from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { Button, Snackbar, TextField, Autocomplete, Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import "../App.css";
import Image from "./img/earth.png";

const AddComponent = () => {

    const initialState = {
       msg: "",
       snackBarMsg: "",
       contactServer: false,
       alerts: [],
       countries: [],
       country: "",
       name: "",
       text: "Exercise a high degree of caution",
       date: new Date().toLocaleString(),
       reg: "-",
       sub: "-",
       };

    const reducer = (state, newState) => ({ ...state, ...newState });
   
    const [state, setState] = useReducer(reducer, initialState);
       useEffect(() => {
       fetchCountries();
    }, []);

    const fetchCountries = async () => {
       try {
       setState({
       contactServer: true,
       snackBarMsg: "Attempting to load countries from server...",
       });
       let response = await fetch("/graphql", {
       method: "POST",
       headers: {
       "Content-Type": "application/json; charset=utf-8",
       },
       body: JSON.stringify({ query: "query { alerts{country,name,region,subregion} }" }),
       });
       let json = await response.json();
       setState({
       snackBarMsg: `countries loaded`,
       alerts: json.data.alerts,
       contactServer: true,
       countries: json.data.alerts.map((a) => a.name),
       });
       } catch (error) {
       console.log(error);
       setState({
       msg: `Problem loading server data - ${error.message}`,
       });
       }
    };

    const snackbarClose = (event, reason) => {
       if (reason === "clickaway") {
       return;
       }
       setState({
       msg: `${state.countries.length} countries loaded`,
       contactServer: false,
       });
    };

    const addAdvisory = async () => {
        let country = {
            country: state.country,
            name: state.name,
            text: state.text,
            date: state.date,
            reg: state.reg,
            sub: state.sub,
            };
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            try {
                let query = JSON.stringify({
                query: `mutation {addalert(country: "${country.country}", name: "${country.name}", text: "${country.text}", date: "${country.date}", region: "${country.reg}", subregion: "${country.sub}") {country, name, text, date, region, subregion}}`,
                });
                let response = await fetch("/graphql", {
                method: "POST",
                headers: {
                "Content-Type": "application/json; charset=utf-8",
                },
                body: query,
                });
                let json = await response.json();
                setState({
                snackBarMsg: `added advisory on ${state.date}`,
                contactServer: true,
                name: "",
                });
                } catch (error) {
                setState({
                snackBarMsg: `${error.message} - alert not added`,
                showMsg: true,
            });
        }
    };

    const handleName = (e) => {
        setState({ name: e.target.value });
    };

    const handleCountry = (e, v) => {
        setState({ country: v });
    };

 return (
 <ThemeProvider theme={theme}>
 <Card className="card">
    <Card classname="img"
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
  <Typography
 style={{ textAlign: "center", fontSize: 20}}>
 Add Advisory
 </Typography>
 <CardContent     style={{justifyContent: "center",
    alignContent: "center"}}>
 <TextField
    id="tname"
    label="Traveler's Name"
    variant="outlined"
    value={state.name}
    onChange={handleName}
    fullWidth>
 </TextField>
 <Autocomplete
        id="names"
        options={state.countries}
        getOptionLabel={(option) => option}
        onChange={handleCountry}
        style={{ width: 300 }}
        renderInput={(params) => (
        <TextField
        {...params}
        label="countries"
        variant="outlined"
        fullWidth
        />
        )}
    />
 <br />
 <Button
 color="primary"
 variant="contained"
 onClick={addAdvisory}
 disabled={state.name == "" || state.country == ""}
 >
 Add Advisory
 </Button>
 </CardContent>
 </Card>
 <Snackbar
 open={state.contactServer}
 message={state.snackBarMsg}
 autoHideDuration={6000}
 onClose={snackbarClose}
 />
 </ThemeProvider>
 );
};

export default AddComponent;
