import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchLocationInput from "./SearchLocationInputField";

const useStyles = makeStyles((theme) => ({
  inputField: {
    display: "flex",
    flexDirection: "row",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  locationField: {  
      borderRadius: theme.spacing(3),
  }
}));

const SearchFields = () => {
  const classes = useStyles();

  return (
    <form className={classes.inputField} noValidate autoComplete="off">
      <TextField
        id="outlined-basic"
        label="Watts"
        variant="outlined"
        type="number"
        required
      />
      <SearchLocationInput />
    </form>
  );
};

export default SearchFields;
