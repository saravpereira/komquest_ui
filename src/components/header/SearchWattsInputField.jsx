import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as SearchQueryActions from "./redux/actions";
import * as SearchQuerySelectors from "./redux/selectors";

const useStyles = makeStyles((theme) => ({
  wattsInput: {
    height: theme.spacing(4),
    padding: "8px 12px",
    border: "none",
    fontSize: "16px",
    borderRadius: theme.spacing(0.5),
    "&:focus": {
      outline: "none",
    },
  },
  unitText: {
    paddingTop: theme.spacing(1.5),
    paddingRight: theme.spacing(0.5),
  },
  searchWattsInput: {
    display: "flex",
    backgroundColor: "white",
    borderRadius: theme.spacing(0.5),
    border: "1px solid #BAB9B9",
    "&:hover": {
      boxShadow: "0 1px 6px 0 rgba(32,33,36,0.28)",
      borderColor: "rgba(223,225,229,0)",
    },
    "&:focus-within": {
      boxShadow: "0 1px 6px 0 rgba(32,33,36,0.28)",
    },
  },
}));

const SearchWattsInputField = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const currentWatts = useSelector(SearchQuerySelectors.selectWatts);

  const handleWattsChange = (e) => {
    setQuery(e.target.value);
    dispatch(SearchQueryActions.setWatts(e.target.value));
  };

  return (
    <div className={classes.searchWattsInput}>
      <input
        className={classes.wattsInput}
        onChange={handleWattsChange}
        placeholder="Watts *"
        value={query || currentWatts}
        required
        type="number"
        min="0"
      />
      <div className={classes.unitText}>
        <span>
          <Typography variant="body1" component="p">
            W
          </Typography>
        </span>
      </div>
    </div>
  );
};

export default SearchWattsInputField;
