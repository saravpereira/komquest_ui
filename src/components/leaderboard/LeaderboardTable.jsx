import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@material-ui/core/Typography";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import EmptyLeaderboard from "./EmptyLeaderboard";
import * as KomsSelector from "../results/redux/selectors";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    width: "30%",
    backgroundColor: "white",
    marginTop: theme.spacing(3.75),
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1.25),
    overflowY: "auto",
    overflowX: "auto",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("xs")]: {
      height: theme.spacing(70),
      width: "100%",
    },
  },
  title: {
    marginBottom: theme.spacing(1.25),
    display: "flex",
    justifyContent: "center",
  },
  table: {
    display: "flex",
    justifyContent: "center",
  },
  power: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap",
    },
  },
  powerUnit: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  speed: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  speedUnit: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  speedHeader: {
    display: "flex",
    flexDirection: "row",
  },
  headerUnits: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

const LeaderboardTable = ({ match }) => {
  const classes = useStyles();
  const recommendedKoms = useSelector(KomsSelector.selectRecommendedKoms);
  const chosenSegment = recommendedKoms?.filter(
    (koms) => koms.segment.id === parseInt(match.params.id)
  );
  const leaderEntries =
    !isEmpty(chosenSegment) ? chosenSegment[0].segmentLeaderboard?.leaderboardEntries : [];

  const segmentName = !isEmpty(chosenSegment) && chosenSegment[0].segment?.name;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.title}>
          <Typography variant="h6" component="h6">
            {segmentName}
          </Typography>
        </div>

        <TableContainer className={classes.table}>
          <Table sx={{ width: 600 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="center">
                  Speed
                  <div className={classes.headerUnits}>&nbsp;(km/h)</div>
                </StyledTableCell>
                <StyledTableCell align="center">
                  Power
                  <div className={classes.headerUnits}>&nbsp;(W)</div>
                </StyledTableCell>
                <StyledTableCell align="center">Time</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderEntries?.map((entry) => (
                <StyledTableRow
                  key={entry.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {entry.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className={classes.speed}>
                      {entry.speed}{" "}
                      <div className={classes.speedUnit}>km/h</div>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <div className={classes.power}>
                      {entry.power}
                      <div className={classes.powerUnit}>
                        W<FlashOnIcon fontSize="small" color="disabled" />
                      </div>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">{entry.time}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default LeaderboardTable;
