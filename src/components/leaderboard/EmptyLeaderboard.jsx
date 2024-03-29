import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import * as KomsSelector from "../results/redux/selectors";
import * as SearchQuerySelectors from "../header/redux/selectors";
import { capitalizeFirstLetter } from "./utils";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    width: "30%",
    backgroundColor: "#dfdfdf",
    marginTop: theme.spacing(3.75),
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1.25),
    overflowY: "auto",
    overflowX: "auto",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "70%",
    },
  },
}));

const EmptyLeaderboard = ({ match }) => {
  const classes = useStyles();
  const recommendedKoms = useSelector(KomsSelector.selectRecommendedKoms);
  const recommendationType = useSelector(KomsSelector.selectRecommendationType);
  const isLoading = useSelector(KomsSelector.selectIsLoading);
  const currentAddress = useSelector(SearchQuerySelectors.selectAddress);
  const chosenSegment = recommendedKoms?.filter(
    (koms) => koms.segment.id === parseInt(match.params.id)
  );

  const formattedRecType = capitalizeFirstLetter(recommendationType);

  return (
    <div className={classes.root}>
      {isLoading === 0 && (
        <div className={classes.container}>
          <Typography variant="h6" component="h6">
            Uh-Oh!
          </Typography>
          <Typography variant="body1">
            {isEmpty(recommendedKoms)
              ? "Seems like the search query is empty or expired. Please navigate back to search for KOMs."
              : isEmpty(chosenSegment) &&
                `This segment ID doesn't match what you're querying for: ${formattedRecType} segments at ${currentAddress}`}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default EmptyLeaderboard;
