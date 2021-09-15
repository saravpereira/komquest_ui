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
    bottom: "20px",
    alignItems: "center",
    height: "20px",
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
        <div className={classes.cards}>
          <KomsResult
            id={result.id}
            name={result.name}
            distance={result.distance}
            key={result.name}
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
