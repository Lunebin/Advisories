import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import "../App.css";
import Image from "./img/earth.png";

const Project1Component = () => {
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
 <CardContent>
 <br />
 <Typography
 color="primary"
 style={{ float: "right", paddingRight: "1vh", fontSize: "smaller" }}
 >
 &copy;INFO3139 - 2023
 </Typography>
 </CardContent>
 </Card>
 </ThemeProvider>
 );
};
export default Project1Component;
