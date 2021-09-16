import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import SearchLocationInput from "./SearchLocationInputField";
import * as SearchQuerySelectors from "./redux/selectors";
import * as KomsActions from "../results/redux/actions";
import SearchWattsInputField from "./SearchWattsInputField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
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
  },
}));

const SearchFields = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isInputFilled = useSelector(SearchQuerySelectors.selectIsInputValid);

  const handleSubmitSearchQuery = () => {
    dispatch(KomsActions.fetchRecommendedKoms());
  };

  return (
    <div className={classes.container}>
      <form className={classes.inputField} noValidate autoComplete="off">
        <SearchWattsInputField />
        <SearchLocationInput />
        <Tooltip
          title={
            isInputFilled ? "" : "Enter Watts and Address to start your search"
          }
          aria-label="search"
        >
          <div className={classes.submitButton}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={!isInputFilled}
              onClick={handleSubmitSearchQuery}
            >
              Search KOMS
            </Button>
          </div>
        </Tooltip>
      </form>
    </div>
  );
};

export default SearchFields;
