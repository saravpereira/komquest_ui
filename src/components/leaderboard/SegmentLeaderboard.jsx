import React from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import LeaderboardTable from "./LeaderboardTable";
import EmptyLeaderboard from "./EmptyLeaderboard";
import * as KomsSelector from "../results/redux/selectors";


const SegmentLeaderboard = ({ match }) => {
  const recommendedKoms = useSelector(KomsSelector.selectRecommendedKoms);
  const chosenKom = recommendedKoms?.filter(
    (koms) => koms.segment.id === parseInt(match.params.id)
  );

  return (
    <>
      {!isEmpty(recommendedKoms) && !isEmpty(chosenKom) ? (
        <LeaderboardTable match={match} />
      ) : (
        <EmptyLeaderboard match={match} />
      )}
    </>
  );
};

export default SegmentLeaderboard;
