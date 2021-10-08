import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "../components/header/NavBar";
import KomsResults from "../components/results/KomsResults";
import SegmentLeaderboard from "../components/leaderboard/SegmentLeaderboard";
import AboutPage from "../components/about/AboutPage";
import HomePage from "../components/home/HomePage";

const KomquestsUI = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/search" component={KomsResults} />
          <Route path="/leaderboard/:id" component={SegmentLeaderboard} />
          <Route path="/about" exact component={AboutPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default KomquestsUI;
