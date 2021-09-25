import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@mui/material/Button";
import MenuDrawer from "./MenuDrawer";
import komquestsLogo from "../common/images/komquestsLogo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 8,
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
    [theme.breakpoints.down("md")]: {
      flexWrap: "wrap",
    },
  },
  navOptions: {
    display: "flex",
    flexDirection: "row",
  },
  option: {
    margin: "10px",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  menuIcon: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#2E3B55", padding: 6 }}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.logoAndTitle}>
            <div className={classes.logo}>
              <img src={komquestsLogo} alt="logo" width="50" height="60" />
            </div>
            <div className={classes.title}>
              <Typography variant="h6">KOMQuests</Typography>
            </div>
          </div>
          <div className={classes.navOptions}>
            <div className={classes.menuIcon}>
              <MenuDrawer />
            </div>

            <div className={classes.option}>
              <Link to={`/`} style={{ textDecoration: "none" }}>
                <Button
                  style={{
                    color: "white",
                  }}
                >
                  Home
                </Button>
              </Link>
            </div>
            <div className={classes.option}>
              <Link to={`/about`} style={{ textDecoration: "none" }}>
                <Button
                  style={{
                    color: "white",
                  }}
                >
                  About
                </Button>
              </Link>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
