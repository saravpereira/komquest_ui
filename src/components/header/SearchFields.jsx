import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import qs from "query-string";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import SearchLocationInput from "./SearchLocationInputField";
import * as SearchQuerySelectors from "./redux/selectors";
import * as KomsSelectors from "../results/redux/selectors";
import * as KomsActions from "../results/redux/actions";
import AdvanceSearchFields from "./AdvanceSearchFields";
import RecommendationTypeSwitch from "./RecommendationTypeSwitch";

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
  filters: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      flexWrap: "wrap",
    },
  },
  typeFilter: {
    paddingTop: theme.spacing(0.5),
    paddingLeft: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
  },
}));

const SearchFields = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const address = useSelector(SearchQuerySelectors.selectAddress);
  const recommendationType = useSelector(
    KomsSelectors.selectRecommendationType
  );
  const isLoading = useSelector(KomsSelectors.selectIsLoading);

  const queryParam = qs.parse(location.search);
  const newQueryParam = {
    ...queryParam,
    a: address,
    rt: recommendationType,
  };

  const handleSubmitSearchQuery = async () => {
    history.push({
      pathname: "/search",
      search: qs.stringify(newQueryParam),
    });

    dispatch(KomsActions.fetchRecommendedKoms())
  };

  return (
    <div className={classes.container}>
      <form className={classes.inputField} noValidate autoComplete="off" onSubmit={e => e.preventDefault()}>
        <SearchLocationInput />
        <div className={classes.filters}>
          <div className={classes.advanceSearchButton}>
            <AdvanceSearchFields />
          </div>
          <Tooltip title="Re-run your search if modified">
            <div className={classes.typeFilter}>
              <RecommendationTypeSwitch />
            </div>
          </Tooltip>
        </div>
      </form>
      <Tooltip
        title={
          !address
            ? "Enter an Address to start your search"
            : isLoading > 0
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
            disabled={!address || isLoading === 1}
            onClick={handleSubmitSearchQuery}
            style={
              !address || isLoading > 0
                ? {}
                : { background: "#2E3B55", color: "white" }
            }
          >
            <SearchIcon />
            &nbsp; Search KOMS
          </Button>
        </div>
      </Tooltip>
    </div>
  );
};

export default SearchFields;
