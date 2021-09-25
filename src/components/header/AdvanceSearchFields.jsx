import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Button from "@mui/material/Button";
import CoreButton from "@material-ui/core/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as SearchQueryActions from "./redux/actions";
import * as SearchQuerySelectors from "./redux/selectors";
import * as KomsSelectors from "../results/redux/selectors";

const useStyles = makeStyles((theme) => ({
  inputFields: {
    border: "none",
    height: theme.spacing(3),
    width: theme.spacing(13),
    padding: "4px 6px",
    borderRadius: theme.spacing(0.5),
    "&:focus": {
      outline: "none",
    },
  },
  resetButton: {
    display: "flex",
    justifyContent: "center",
  },
}));

const AdvanceSearchFields = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const positiveGrade = useSelector(SearchQuerySelectors.selectPositiveGrade);
  const maxDistance = useSelector(SearchQuerySelectors.selectMaxDistance);
  const maxGrade = useSelector(SearchQuerySelectors.selectMaxGrade);
  const watts = useSelector(SearchQuerySelectors.selectWatts);
  const isLoading = useSelector(KomsSelectors.selectIsLoading);

  const handlePostiveGradeChange = (e) =>
    dispatch(SearchQueryActions.setPositiveGrade(e.target.checked));

  const handleMaxDistanceChange = (e) => {
    const typedMaxDistance = e.target.value === "" ? null : e.target.value;
    dispatch(SearchQueryActions.setMaxDistance(typedMaxDistance));
  };

  const handleMaxGradeChange = (e) => {
    const typedMaxGrade = e.target.value === "" ? null : e.target.value;
    dispatch(SearchQueryActions.setMaxGrade(typedMaxGrade));
  };

  const handleWattsChange = (e) => {
    dispatch(SearchQueryActions.setWatts(e.target.value));
  };

  const handleReset = () =>  dispatch(SearchQueryActions.resetAdvanceSearch());

  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <CoreButton
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        disabled={isLoading === 1}
        style={{ background: "#2E3B55", color: "white" }}
        size="large"
      >
        <ControlPointIcon />
        &nbsp; Filters
      </CoreButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() =>
            dispatch(SearchQueryActions.setPositiveGrade(!positiveGrade))
          }
        >
          <input
            type="checkbox"
            onChange={handlePostiveGradeChange}
            checked={positiveGrade ? true : false}
          />
          &nbsp; Positive Grade
        </MenuItem>
        <MenuItem>
          <input
            placeholder="Max Grade"
            type="number"
            className={classes.inputFields}
            onChange={handleMaxGradeChange}
            value={maxGrade || ""}
            min={positiveGrade ? "1" : ""}
          />
          &nbsp; %
        </MenuItem>
        <MenuItem>
          <input
            placeholder="Max Distance"
            type="number"
            className={classes.inputFields}
            onChange={handleMaxDistanceChange}
            value={maxDistance || ""}
          />
          &nbsp; miles
        </MenuItem>
        <MenuItem>
          <input
            placeholder="Max Watts"
            type="number"
            className={classes.inputFields}
            onChange={handleWattsChange}
            value={watts}
          />
          &nbsp; Watts
        </MenuItem>
        <div className={classes.resetButton}>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </Menu>
    </>
  );
};

export default AdvanceSearchFields;
