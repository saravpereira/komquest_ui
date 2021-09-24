import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as SearchQueryActions from "./redux/actions";
import * as SearchQuerySelectors from "./redux/selectors";
import * as KomsSelectors from "../results/redux/selectors"

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
  const isLoading = useSelector(KomsSelectors.selectIsLoading);

  const handlePostiveGradeChange = (e) => {
    dispatch(SearchQueryActions.setPositiveGrade(e.target.checked));
  };

  const handleMaxDistanceChange = (e) => {
    const typedMaxDistance = e.target.value === "" ? null : e.target.value
    dispatch(SearchQueryActions.setMaxDistance(typedMaxDistance));
  };

  const handleMaxGradeChange = (e) => {
    const typedMaxGrade = e.target.value === "" ? null : e.target.value
    dispatch(SearchQueryActions.setMaxGrade(typedMaxGrade));
  };

  const handleReset = () => {
    dispatch(SearchQueryActions.resetAdvanceSearch());
  };

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        disabled={isLoading === 1}
      >
        <ControlPointIcon />
        &nbsp; More
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
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
        <div className={classes.resetButton}>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </Menu>
    </>
  );
};

export default AdvanceSearchFields;
