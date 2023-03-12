import React, {useReducer, useEffect} from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { Table, TableRow, Radio, RadioGroup, Snackbar, TextField, Autocomplete, Avatar, Card, CardContent, CardHeader, Typography, FormControlLabel, TableHead, TableCell, TableBody, TableContainer, Paper } from "@mui/material";
import "../App.css";
import Image from "./img/earth.png";

const ListComponent = () => {

    const initialState = {
       msg: "",
       snackBarMsg: "",
       contactServer: false,
       alerts: [],
       names: [],
       regions: [],
       subregions: [],
       input: "",
       radio: "",

       country: "",
       name: "",
       text: "",
       date: "",
       reg: "-",
       sub: "-",
       };

    const reducer = (state, newState) => ({ ...state, ...newState });
   
    const [state, setState] = useReducer(reducer, initialState);
       useEffect(() => {
       fetchAlerts();
    }, []);

    const fetchAlerts = async() => {
        try {
            setState({
            contactServer: true,
            snackBarMsg: "Attempting to load alerts from server...",
            });
            let response = await fetch("/graphql", {
            method: "POST",
            headers: {
            "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ query: "query { names }"}),
            });
            let json = await response.json();
            setState({
            snackBarMsg: `found ${json.data.names.length} travelers`,
            names: json.data.names,
            contactServer: true,
            });
            } catch (error) {
            console.log(error);
            setState({
            msg: `Problem loading server data - ${error.message}`,
            });
        }
    };

       
    const fetchRegions = async() => {
        try {
            setState({
            contactServer: true,
            snackBarMsg: "Attempting to load alerts from server...",
            });
            let response = await fetch("/graphql", {
            method: "POST",
            headers: {
            "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ query: "query { regions }"}),
            });
            let json = await response.json();
            setState({
            snackBarMsg: `found ${json.data.regions.length} regions`,
            names: json.data.regions,
            contactServer: true,
            });
            } catch (error) {
            console.log(error);
            setState({
            msg: `Problem loading server data - ${error.message}`,
            });
        }
    };

       
    const fetchSubregions = async() => {
        try {
            setState({
            contactServer: true,
            snackBarMsg: "Attempting to load alerts from server...",
            });
            let response = await fetch("/graphql", {
            method: "POST",
            headers: {
            "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ query: "query { subregions }"}),
            });
            let json = await response.json();
            setState({
            snackBarMsg: `found ${json.data.subregions.length} subregions`,
            names: json.data.subregions,
            contactServer: true,
            });
            } catch (error) {
            console.log(error);
            setState({
            msg: `Problem loading server data - ${error.message}`,
            });
        }
    };

    const fetchTravelerAlerts = async (name) => {
       try {
            setState({
            contactServer: true,
            snackBarMsg: "Attempting to load alerts from server...",
            });
            let response = await fetch("/graphql", {
            method: "POST",
            headers: {
            "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ query: `query { alertsforname(name : "${name}"){country,name,text,date,region,subregion} }` }),
            });
            let json = await response.json();
            setState({
            snackBarMsg: `found ${json.data.alertsforname.length} alerts for ${name}`,
            alerts: json.data.alertsforname,
            contactServer: true,
            });
       } catch (error) {
            console.log(error);
            setState({
            msg: `Problem loading server data - ${error.message}`,
            });
       }
    };

    const fetchRegionAlerts = async (reg) => {
        try {
            setState({
            contactServer: true,
            snackBarMsg: "Attempting to load alerts from server...",
            });
            let response = await fetch("/graphql", {
            method: "POST",
            headers: {
            "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ query: `query { alertsforregion(region: "${reg}"){country,name,text,date,region,subregion} }` }),
            });
            let json = await response.json();
            setState({
            snackBarMsg: `found ${json.data.alertsforregion.length} alerts for ${reg}`,
            alerts: json.data.alertsforregion,
            contactServer: true,
            });
        } catch (error) {
            console.log(error);
            setState({
            msg: `Problem loading server data - ${error.message}`,
            });
        }
    };

    const fetchSubregionAlerts = async (sub) => {
        try {
            setState({
            contactServer: true,
            snackBarMsg: "Attempting to load alerts from server...",
            });
            let response = await fetch("/graphql", {
            method: "POST",
            headers: {
            "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({ query: `query { alertsforsubregion( subregion : "${sub}"){country,name,text,date,region,subregion} }` }),
            });
            let json = await response.json();
            setState({
            snackBarMsg: `found ${json.data.alertsforsubregion.length} alerts for ${sub}`,
            alerts: json.data.alertsforsubregion,
            contactServer: true,
            });
        } catch (error) {
            console.log(error);
            setState({
            msg: `Problem loading server data - ${error.message}`,
            });
        }
    };

       //{alertsforregion(region:$region) {country,name,text,date,region,subregion}}
       //{alertsforsubregion(subregion:$subregion) {country,name,text,date,region,subregion}}

    const snackbarClose = (event, reason) => {
       if (reason === "clickaway") {
       return;
       }
       setState({
       msg: `${state.alerts.length} alerts loaded`,
       contactServer: false,
       });
    };

    const handleInput = async (e, v) => {

        if (state.radio == "t") {
            setState({ name: v });
            fetchTravelerAlerts(v);
        }
        else if (state.radio == "r") {
            setState({ reg: v });
            fetchRegionAlerts(v);
        }
        else if (state.radio == "s") {
            setState({ sub: v });
            fetchSubregionAlerts(v);
        }
    };

    const onChangeRadio = async (e, v) => {

        if (e.target.id == "t") {
            fetchAlerts();
            setState({radio: "t", input: "", alerts: []});
            
        }
        else if (e.target.id == "r") {
            fetchRegions();
            setState({radio: "r", input: "", alerts: []});
        }
        else if (e.target.id == "s") {
            fetchSubregions();
            setState({radio: "s", input: "", alerts: []});
        }
    }

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
 List Advisories By:
 </Typography>
 <CardContent style={{justifyContent: "center",
    alignContent: "center"}}>
<RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="t"
    name="radio-buttons-group">
    <FormControlLabel value="t" control={<Radio id="t" onChange={onChangeRadio}></Radio>} label="traveler"></FormControlLabel>
    <FormControlLabel value="r" control={<Radio id="r" onChange={onChangeRadio}></Radio>} label="region"></FormControlLabel>
    <FormControlLabel value="s" control={<Radio id="s" onChange={onChangeRadio}></Radio>} label="subregion"></FormControlLabel>
</RadioGroup>
 <Autocomplete
        id="names"
        options={state.names}
        getOptionLabel={(option) => option}
        onChange={handleInput}
        value={state.input}
        style={{ width: 300 }}
        renderInput={(params) => (
        <TextField
        {...params}
        label="input"
        variant="outlined"
        fullWidth
        />
        )}
    />
 <br />
 </CardContent>
<TableContainer component={Paper}>
    <Table>
        <TableHead>
            <TableRow>
                <TableCell align="center"
                style={{ color: theme.palette.primary.main, textAlign: "center", fontWeight: "bold" }}>Country
                </TableCell>
                <TableCell align="center"
                style={{ color: theme.palette.primary.main, textAlign: "center", fontWeight: "bold" }}>Alert Information
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {state.alerts.map((item,index) => (
                <TableRow key={index}>
                    <TableCell align="center">
                        {item.name}
                    </TableCell>
                    <TableCell align="center">
                        {item.text} {item.date}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>
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

export default ListComponent;
