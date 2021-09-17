import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { FaArrowCircleUp } from "react-icons/fa";
import KomsResult from "./KomsResult";
import EmptyView from "./EmptyView";
import * as KomsSelector from "./redux/selectors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    [theme.breakpoints.down("xs")]: {
      height: "500px",
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
}));

const KomsResults = () => {
  const classes = useStyles();
  const recommendedKoms = useSelector(KomsSelector.selectRecommendedKoms);
  const [showScroll, setShowScroll] = useState(false);

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
    <div className={classes.root}>
      {recommendedKoms?.map((result) => (
        <div className={classes.cards} key={result.name}>
          <KomsResult
            id={result.segment.id}
            name={result.segment.name}
            distance={result.segment.distance}
            miles={result.miles}
            key={result.segment.name}
          />
        </div>
      ))}
      {!recommendedKoms && (
        <div>
          <EmptyView />
        </div>
      )}
      <FaArrowCircleUp
        className={classes.scrollTop}
        onClick={scrollTop}
        style={{ height: 40, display: showScroll ? "flex" : "none" }}
      />
    </div>
  );
};

export default KomsResults;
