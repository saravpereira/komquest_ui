import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '30%',
    margin: theme.spacing(1),
  },
}));

const KomsResult = ({ id, name, distance }) => {
  const classes = useStyles();

  const handleClick = () => {
    window.open(`http://strava.com/segments/${id}`);
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" component="p">
          {distance} meters
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={handleClick}>View in Strava</Button>
      </CardActions>
    </Card>
  );
};

export default KomsResult;
