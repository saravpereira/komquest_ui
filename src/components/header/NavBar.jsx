import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import SearchFields from "./SearchFields";
import komquestsLogo from "../common/komquestsLogo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logoAndTitle: {
    display: "flex",
    flexDirection: "row",
  },
  logo: {
    display: "flex",
    marginRight: theme.spacing(1.5),
  },
  title: {
    display: "flex",
    paddingTop: "14px",
  },
  appBar: {
    boxShadow: "none",
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.logoAndTitle}>
            <div className={classes.logo}>
              <img src={komquestsLogo} alt="logo" width="50" height="60" />
            </div>
            <div className={classes.title}>
              <Typography variant="h6">Komquests</Typography>
            </div>
          </div>
          <SearchFields />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
