import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { useLocation } from "react-router-dom";
import { isEmpty } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { FaArrowCircleUp } from "react-icons/fa";
import KomsResult from "./KomsResult";
import SearchFields from "../header/SearchFields";
import * as SearchQueryActions from "../header/redux/actions";
import * as SearchQuerySelectors from "../header/redux/selectors";
import * as KomsSelector from "./redux/selectors";
import * as KomsActions from "./redux/actions";

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
  emptyText: {
    display: "flex",
    justifyContent: "flex-start",
  },
  scrollTop: {
    position: "fixed",
    width: "100%",
    bottom: theme.spacing(2.5),
    alignItems: "center",
    height: theme.spacing(2.5),
    justifyContent: "center",
    zIndex: "1000",
    cursor: "pointer",
    animation: "fadeIn 0.3s",
    transition: "opacity 0.4s",
    opacity: "0.5",
  },
  searchInputs: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  navigateBackContainer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },
}));

const KomsResults = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const recommendedKoms = useSelector(
    KomsSelector.selectFilteredRecommendedKoms
  );
  const recommendationType = useSelector(KomsSelector.selectRecommendationType);
  const address = useSelector(SearchQuerySelectors.selectAddress);
  const isLoading = useSelector(KomsSelector.selectIsLoading);
  const [showScroll, setShowScroll] = useState(false);

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

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 100) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 100) {
      setShowScroll(false);
    }
  };
  window.addEventListener("scroll", checkScrollTop);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        {!isLoading &&
          recommendedKoms?.map((result) => (
            <div className={classes.cards} key={result.segment.name}>
              <KomsResult
                id={result.segment.id}
                name={result.segment.name}
                miles={result.miles}
                grade={result.segment.averageGrade}
                elevationChange={result.segment.elevationDifference}
                key={result.segment.name}
                kom={result.segmentLeaderboard.firstPlace}
              />
            </div>
          ))}
        <FaArrowCircleUp
          className={classes.scrollTop}
          onClick={scrollTop}
          style={{ height: 40, display: showScroll ? "flex" : "none" }}
        />
      </div>
    </div>
  );
};

export default KomsResults;
