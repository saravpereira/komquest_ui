import React from "react";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@material-ui/core/Typography";
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
    width: "25%",
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
}));

const SegmentLeaderboard = ({ match }) => {
  const classes = useStyles();
  const recommendedKoms = useSelector(KomsSelector.selectRecommendedKoms);
  const chosenKom = recommendedKoms?.filter(
    (koms) => koms.segment.id === parseInt(match.params.id)
  );
  const leaderEntries =
    chosenKom && chosenKom[0].segmentLeaderboard?.leaderboardEntries;

  const segmentName = chosenKom && chosenKom[0].segment?.name;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.title}>
          <Typography variant="h6" component="h6">
            {segmentName}
          </Typography>
        </div>

        <TableContainer className={classes.table}>
          <Table sx={{ width: 420 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Speed</StyledTableCell>
                <StyledTableCell align="right">Power</StyledTableCell>
                <StyledTableCell align="right">Time</StyledTableCell>
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
                  <StyledTableCell align="right">{entry.speed}</StyledTableCell>
                  <StyledTableCell align="right">{entry.power}</StyledTableCell>
                  <StyledTableCell align="right">{entry.time}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default SegmentLeaderboard;
