import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router";
import { isEmpty } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as KomsSelector from "../results/redux/selectors";
import { LEADERBOARD_URL } from "../common/constants/urls";
import SearchFields from "./SearchFields";
import komquestsLogo from "../common/images/komquestsLogo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 4,
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
  navigateBackContainer: {
    display: "flex",
    justifyContent: "center",
    margin: theme.spacing(0.625),
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginTop: theme.spacing(1.25),
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const recommendedKoms = useSelector(KomsSelector.selectRecommendedKoms);

  const goBack = () => {
    history.goBack();
  };

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
          {!location.pathname.includes(LEADERBOARD_URL) ? (
            <SearchFields />
          ) : (
            <div className={classes.navigateBackContainer}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={goBack}
              >
                <ArrowBackIcon />
                <Typography variant="body1">
                  {isEmpty(recommendedKoms)
                    ? "Back to Koms Search"
                    : "Back to Recommendations"}
                </Typography>
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
