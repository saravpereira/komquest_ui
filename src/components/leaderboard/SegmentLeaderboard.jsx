import React, { useEffect } from "react";
import { useLocation, useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { isEmpty } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@material-ui/core/Typography";
import { LEADERBOARD_URL } from "../common/constants/urls";
import LeaderboardTable from "./LeaderboardTable";
import EmptyLeaderboard from "./EmptyLeaderboard";
import * as KomsSelector from "../results/redux/selectors";
import * as KomsActions from "../results/redux/actions";
import * as SearchQuerySelectors from "../header/redux/selectors";
import * as SearchQueryActions from "../header/redux/actions";

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
      marginTop: theme.spacing(1.25),
    },
  },
}));

const SegmentLeaderboard = ({ match }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const recommendedKoms = useSelector(KomsSelector.selectRecommendedKoms);
  const recommendationType = useSelector(KomsSelector.selectRecommendationType);
  const address = useSelector(SearchQuerySelectors.selectAddress);

  const chosenKom = recommendedKoms?.filter(
    (koms) => koms.segment.id === parseInt(match.params.id)
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (
      params.get("a") === address &&
      params.get("rt") === recommendationType &&
      !isEmpty(recommendedKoms)
    ) {
      return;
    }

    dispatch(
      SearchQueryActions.updateAllParams({
        address: params.get("a"),
        recommendationType: params.get("rt"),
      })
    );
    dispatch(KomsActions.fetchRecommendedKoms());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const goBack = () => {
    history.push({
      pathname: "/search",
      search: location.search,
    });
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
      <LoadingBar
        updateTime={700}
        maxProgress={85}
        progressIncrease={3}
        style={{ backgroundColor: "#493FC4", height: "5px" }}
      />
      {!isEmpty(recommendedKoms) && !isEmpty(chosenKom) ? (
        <LeaderboardTable match={match} />
      ) : (
        <EmptyLeaderboard match={match} />
      )}
    </div>
  );
};

export default SegmentLeaderboard;
