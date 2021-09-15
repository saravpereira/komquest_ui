import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SearchLocationInput from "./SearchLocationInputField";
import * as SearchQuerySelectors from "./redux/selectors";
import * as KomsActions from "../results/redux/actions";
import SearchWattsInputField from "./SearchWattsInputField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  inputField: {
    display: "flex",
    flexDirection: "row",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  locationField: {
    borderRadius: theme.spacing(3),
  },
  submitButton: {
    paddingTop: theme.spacing(1.5),
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
      </form>
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
    </div>
  );
};

export default SearchFields;
