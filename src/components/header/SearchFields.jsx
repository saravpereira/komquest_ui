import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import SearchLocationInput from "./SearchLocationInputField";
import * as SearchQuerySelectors from "./redux/selectors";
import * as KomsActions from "../results/redux/actions";
import * as KomsSelectors from "../results/redux/selectors";
import AdvanceSearchFields from "./AdvanceSearchFields";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      flexWrap: "wrap",
    },
  },
  inputField: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(0.5),
    },
    [theme.breakpoints.down("md")]: {
      flexWrap: "wrap",
    },
  },
  locationField: {
    borderRadius: theme.spacing(3),
  },
  submitButton: {
    paddingTop: theme.spacing(0.5),
    display: "flex",
    justifyContent: "center",
  },
  advanceSearchButton: {
    paddingTop: theme.spacing(0.5),
  },
}));

const SearchFields = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isInputFilled = useSelector(SearchQuerySelectors.selectIsInputValid);
  const isLoading = useSelector(KomsSelectors.selectIsLoading);

  const handleSubmitSearchQuery = () => {
    dispatch(KomsActions.fetchRecommendedKoms());
  };

  return (
    <div className={classes.container}>
      <form className={classes.inputField} noValidate autoComplete="off">
        <SearchLocationInput />
        <div className={classes.advanceSearchButton}>
          <AdvanceSearchFields />
        </div>
      </form>
      <Tooltip
        title={
          !isInputFilled
            ? "Enter an Address to start your search"
            : isLoading === 1
            ? "Search is in Progress..."
            : ""
        }
        aria-label="search"
      >
        <div className={classes.submitButton}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={!isInputFilled || isLoading === 1}
            onClick={handleSubmitSearchQuery}
          >
            Search KOMS
          </Button>
        </div>
      </Tooltip>
    </div>
  );
};

export default SearchFields;
