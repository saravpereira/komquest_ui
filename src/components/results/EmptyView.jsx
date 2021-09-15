import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  root: {
    width: "35%",
    marginLeft: 50,
    marginTop: 200,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 27,
  },
  instructions: {
    display: "flex",
    flexDirection: "row",
  }
});

const EmptyView = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <div className={classes.root}>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        Word of the Day
      </Typography>
      <Typography variant="h3" component="h2">
        K{bull}O{bull}M
      </Typography>
      <Typography className={classes.pos} color="textSecondary">
        noun
      </Typography>
      <Typography variant="body1" component="p">
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
          Start your Komquest search by entering the <b><i> Watts </i></b> and{" "}
          <b><i> Address </i></b> above
        </Typography>
      </div>
    </div>
  );
};

export default EmptyView;
