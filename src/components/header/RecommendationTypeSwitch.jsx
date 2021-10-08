import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { indigo } from "@mui/material/colors";
import * as ResultsActions from "../results/redux/actions";
import * as SearchQueryActions from "../header/redux/actions";
import * as KomsSelectors from "../results/redux/selectors";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: ({isLoading}) => (!isLoading && "#2E3B55"),
    paddingLeft: theme.spacing(1.25),
    borderRadius: theme.spacing(0.6),
  },
}));

const RecommendationTypeSwitch = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("cycling");
  const isLoading = useSelector(KomsSelectors.selectIsLoading);
  const classes = useStyles({isLoading});

  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value === "cycling") {
      dispatch(SearchQueryActions.setPace(""));
      return dispatch(ResultsActions.setRecommendationType("watts"));
    }
    dispatch(SearchQueryActions.setWatts(""));
    return dispatch(ResultsActions.setRecommendationType("pace"));
  };

  return (
    <div className={classes.container}>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="type"
          defaultValue={value}
          name="radio-buttons-group"
          onChange={handleChange}
          row
        >
          <FormControlLabel
            value="cycling"
            control={
              <Radio
                disabled={isLoading}
                sx={!isLoading && {
                  color: indigo[50],
                  "&.Mui-checked": {
                    color: indigo[100],
                  },
                }}
              />
            }
            label={<span style={!isLoading ? { color: "white" } : {}}>Cycling</span>}
          />
          <FormControlLabel
            value="running"
            control={
              <Radio
                disabled={isLoading}
                sx={!isLoading && {
                  color: indigo[50],
                  "&.Mui-checked": {
                    color: indigo[100],
                  },
                }}
              />
            }
            label={<span style={!isLoading ? { color: "white" } : {}}>Running</span>}
          />
        </RadioGroup>
      </FormControl>

    </div>
  );
};

export default RecommendationTypeSwitch;
