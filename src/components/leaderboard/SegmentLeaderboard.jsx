import React from "react";
import { useLocation, useHistory } from "react-router";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@material-ui/core/Typography";
import { LEADERBOARD_URL } from "../common/constants/urls";
import LeaderboardTable from "./LeaderboardTable";
import EmptyLeaderboard from "./EmptyLeaderboard";
import * as KomsSelector from "../results/redux/selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  navigateBackContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "98%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      justifyContent: "center",
      marginTop: theme.spacing(1.25)
    },
  },
}));

const SegmentLeaderboard = ({ match }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const recommendedKoms = useSelector(KomsSelector.selectRecommendedKoms);
  const chosenKom = recommendedKoms?.filter(
    (koms) => koms.segment.id === parseInt(match.params.id)
  );

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className={classes.root}>
      {location.pathname.includes(LEADERBOARD_URL) && (
        <div className={classes.navigateBackContainer}>
          <Button
            variant="contained"
            style={{ background: "#2E3B55", color: "white" }}
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
      {!isEmpty(recommendedKoms) && !isEmpty(chosenKom) ? (
        <LeaderboardTable match={match} />
      ) : (
        <EmptyLeaderboard match={match} />
      )}
    </div>
  );
};

export default SegmentLeaderboard;
