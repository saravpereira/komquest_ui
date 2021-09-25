import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@mui/material/Divider";
import { releaseNotes } from "./releaseNotes";

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
      maxHeight: '80vh',
      minHeight: '1vh',
      width: "85%",
    },
  },
  title: {
    marginBottom: theme.spacing(1.25),
    display: "flex",
    justifyContent: "center",
  },
  releaseTitle: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(0.5),
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  authorName: {
    marginRight: theme.spacing(0.5),
    marginLeft: theme.spacing(0.5),
  },
}));

const AboutPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.title}>
          <Typography variant="h6" component="h6">
            Release Notes
          </Typography>
        </div>
        {releaseNotes?.map((note) => (
          <>
            <Divider />
            <div className={classes.releaseTitle}>
              <Typography variant="body1">{note.title}</Typography>
              <Typography variant="body1">{note.date}</Typography>
            </div>
            <div>
              <ul>
                {note.listOfChanges.map((list) => (
                  <li>
                    <Typography variant="body2">{list}</Typography>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ))}
        <footer className={classes.footer}>
          <div className={classes.authorName}>
            <a
              href={"https://www.linkedin.com/in/brent-ryczak-88466a94/"}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Typography variant="subtitle2">Brent Ryczak</Typography>
            </a>
          </div>
          &nbsp;
          <span>•</span>
          &nbsp;
          <div className={classes.authorName}>
            <a
              href={"https://www.linkedin.com/in/saravpereira/"}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Typography variant="subtitle2">Sara Pereira</Typography>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
