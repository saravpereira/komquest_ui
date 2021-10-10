import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import LoadingBar, { hideLoading } from "react-redux-loading-bar";
import { makeStyles } from "@material-ui/core/styles";
import EmptyView from "../results/EmptyView";
import SearchFields from "../header/SearchFields";
import * as SearchQueryActions from "../header/redux/actions";
import * as KomsActions from "../results/redux/actions";

const useStyles = makeStyles((theme) => ({
  resultContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(2.5),
    [theme.breakpoints.down("xs")]: {
      height: theme.spacing(62.5),
      overflowY: "auto",
    },
  },
  cards: {
    display: "flex",
    justifyContent: "center",
  },
  searchInputs: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginBottom: theme.spacing(1),
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SearchQueryActions.resetAdvanceSearch());
    dispatch(SearchQueryActions.resetAddress());
    dispatch(KomsActions.resetRecommendations());
    dispatch(hideLoading());
  });

  return (
    <div>
      <div className={classes.searchInputs}>
        <SearchFields />
      </div>
      <LoadingBar
        updateTime={700}
        maxProgress={85}
        progressIncrease={3}
        style={{ backgroundColor: "#493FC4", height: "5px" }}
      />
      <div className={classes.resultContainer}>
        <div>
          <EmptyView />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
