import React, { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import {
 Toolbar,
 AppBar,
 Menu,
 MenuItem,
 IconButton,
 Typography,
} from "@mui/material";
import Project1Component from "./project1/project1component";
import ResetComponent from "./project1/resetcomponent";
import AddComponent from "./project1/addcomponent";
import ListComponent from "./project1/listcomponent";

const App = () => {
 const [anchorEl, setAnchorEl] = useState(null);
 const handleClose = () => {
 setAnchorEl(null);
 };
 const handleClick = (event) => {
 setAnchorEl(event.currentTarget);
 };
 return (
 <ThemeProvider theme={theme}>
 <AppBar>
 <Toolbar>
 <Typography variant="h6" color="inherit">
  INFO3139 - Project1
 </Typography>
 <IconButton
 onClick={handleClick}
 color="inherit"
 style={{ marginLeft: "auto", paddingRight: "1vh" }}
 >
 <MenuIcon />
 </IconButton>
 <Menu
 id="simple-menu"
 anchorEl={anchorEl}
 open={Boolean(anchorEl)}
 onClose={handleClose}
 >
 <MenuItem component={NavLink} to="/home" onClick={handleClose}>
 Home
 </MenuItem>
 <MenuItem component={NavLink} to="/reset" onClick={handleClose}>
 Reset Data
 </MenuItem>
 <MenuItem component={NavLink} to="/add" onClick={handleClose}>
 Add Advisory
 </MenuItem>
 <MenuItem component={NavLink} to="/list" onClick={handleClose}>
 List Advisories
 </MenuItem>
 </Menu>
 </Toolbar>
 </AppBar>
 <Routes>
 <Route path="/" element={<Project1Component />} />
 <Route path="/home" element={<Project1Component />} />
 <Route path="/reset" element={<ResetComponent />} />
 <Route path="/add" element={<AddComponent />} />
 <Route path="/list" element={<ListComponent />} />
 </Routes>
 </ThemeProvider>
 );
};
export default App;