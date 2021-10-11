import React from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import KomSymbol from "@mui/icons-material/EmojiEvents";
import Clock from "@mui/icons-material/AccessTime";
import { STRAVA_URL } from "../common/constants/urls";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "30%",
    margin: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    width: "97%",
  },
  power: {
    display: "flex",
    flexDirection: "row",
  },
  komDetails: {
    paddingTop: 1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
}));

const KomsResult = ({ id, name, grade, elevationChange, miles, kom }) => {
  const classes = useStyles();
  const location = useLocation();

  const handleClick = () => {
    window.open(`${STRAVA_URL}${id}`);
  };

  const isCycling = "power" in kom;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" component="p">
          {miles.toFixed(2)} miles <span>•</span> {grade}% grade <span>•</span>{" "}
          {(elevationChange * 3.281).toFixed(0)} ft. elevation
        </Typography>
        <br />
        <div className={classes.power}>
          &nbsp;
          <KomSymbol sx={{ color: "#FFD700" }} fontSize="medium" />
          &nbsp;
          <div className={classes.komDetails}>
            <Typography variant="body2" component="p">
              <strong>KOM:</strong> {isCycling ? kom.power : kom.pace}
              {isCycling ? "W" : <>/km,&nbsp; </>}
            </Typography>
            {isCycling && <FlashOnIcon fontSize="small" color="disabled" />}
            <Typography variant="body2" component="p">
              {kom.time
                ? kom.time.includes(":")
                  ? kom.time
                  : kom.time + "s"
                : "N/A"}
            </Typography>
            &nbsp;
            <Clock fontSize="small" color="disabled" />
          </div>
        </div>
      </CardContent>
      <CardActions className={classes.buttons}>
        <Button size="small" color="primary" onClick={handleClick}>
          View in Strava
        </Button>
        <Link
          to={`/leaderboard/${id}/search${location.search}`}
          style={{ textDecoration: "none" }}
        >
          <Button size="small" color="primary">
            View Leaderboard
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default KomsResult;
