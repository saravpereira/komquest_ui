import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "35%",
    marginLeft: 50,
    marginTop: 200,
    [theme.breakpoints.down("sm")]: {
      marginTop: 250,
      marginLeft: 30,
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: 100,
      marginLeft: 30,
      width: "85%",
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  title: {
    fontSize: 20,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  pos: {
    marginBottom: 27,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  word: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  definition: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  instructions: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("sm")]: {
      color: "#dbd9d9",
    },
  },
}));

const EmptyView = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <div className={classes.root}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Word of the Day
      </Typography>
      <Typography className={classes.word} variant="h3" component="h2">
        K{bull}O{bull}M
      </Typography>
      <Typography className={classes.pos} color="textSecondary">
        noun
      </Typography>
      <Typography className={classes.definition} variant="body1" component="p">
        <i>King of the Mountain</i> on <i>Strava</i>. Earning a crown for being
        the fastest athlete over the segment.
        <br />
        {'"I just stole the KOM running up the Main Street hill segment!"'}
      </Typography>
      <br />
      <br />
      <div className={classes.instructions}>
        <SearchIcon />
        <Typography variant="body2" component="p">
          Start your Komquest search by entering an
          <b>
            <i> Address </i>
          </b>{" "}
          above
        </Typography>
      </div>
    </div>
  );
};

export default EmptyView;
