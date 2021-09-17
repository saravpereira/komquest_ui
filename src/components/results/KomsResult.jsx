import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { STRAVA_URL } from '../common/constants/urls';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '30%',
    margin: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      width: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    width: "97%",
  },
}));

const KomsResult = ({ id, name, distance, miles }) => {
  const classes = useStyles();

  const handleClick = () => {
    window.open(`${STRAVA_URL}${id}`);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" component="p">
          {distance} meters <span>•</span> {miles.toFixed(2)} miles
        </Typography>
      </CardContent>
      <CardActions className={classes.buttons}>
        <Button size="small" color="primary" onClick={handleClick}>View in Strava</Button>
        <Link to={`/leaderboard/${id}`} style={{ textDecoration: 'none' }}><Button size="small" color="primary" >View Leaderboard</Button></Link>
        
      </CardActions>
    </Card>
  );
};

export default KomsResult;
