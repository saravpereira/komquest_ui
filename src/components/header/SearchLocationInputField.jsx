import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { GOOGLE_PLACES_API } from "../common/constants/urls";
import * as SearchQueryActions from "./redux/actions";

const useStyles = makeStyles((theme) => ({
  searchLocationInput: {
    display: "flex",
    width: theme.spacing(60.5),
    borderRadius: theme.spacing(0.5),
    border: "1px solid #BAB9B9",
    "&:hover": {
      boxShadow: "0 1px 6px 0 rgba(32,33,36,0.28)",
      borderColor: "rgba(223,225,229,0)",
    },
    "&:focus-within": {
      boxShadow: "0 1px 6px 0 rgba(32,33,36,0.28)",
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(40.5),
    },
  },
  inputField: {
    height: theme.spacing(4),
    width: "100%",
    padding: "8px 12px",
    border: "none",
    fontSize: "16px",
    borderRadius: theme.spacing(0.5),
    "&:focus": {
      outline: "none",
    },
  },
}));

const SearchLocationInput = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  let autoComplete;

  const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current
    );
    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect(updateQuery)
    );
  }



  async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    dispatch(SearchQueryActions.setAddress(query))
    updateQuery(query);
  }

  const handleOnChange = e => {
    setQuery(e.target.value)
    dispatch(SearchQueryActions.setAddress(query))
  }

  useEffect(() => {
    loadScript(GOOGLE_PLACES_API, () =>
      handleScriptLoad(setQuery, autoCompleteRef)
    );
  });

  return (
    <div className={classes.searchLocationInput}>
      <input
        className={classes.inputField}
        ref={autoCompleteRef}
        onChange={handleOnChange}
        placeholder="Address *"
        value={query}
        required
      />
    </div>
  );
}

export default SearchLocationInput;
