import get from "lodash/get";
import { createSelector } from "reselect";
import * as SearchQuerySelectors from "../../header/redux/selectors";

export const selectRecommendedKoms = (state) =>
  get(state, `koms.recommendedKoms`);

export const selectRecommendationType = (state) =>
  get(state, `koms.recommendationType`);

export const selectIsLoading = (state) => get(state, `loadingBar.default`);

export const selectFilteredRecommendedKoms = createSelector(
  selectRecommendedKoms,
  SearchQuerySelectors.selectMaxDistance,
  SearchQuerySelectors.selectMaxGrade,
  SearchQuerySelectors.selectPositiveGrade,
  SearchQuerySelectors.selectWatts,
  SearchQuerySelectors.selectPace,
  (allRecommededKoms, maxDistance, maxGrade, positiveGrade, watts, pace) => {
    const excluded = [];

    allRecommededKoms.forEach((kom) => {
      if (positiveGrade && kom.segment.averageGrade < 0) {
        excluded.push(kom);
      }

      if (
        maxGrade &&
        kom.segment.averageGrade > maxGrade &&
        !excluded.includes(kom)
      ) {
        excluded.push(kom);
      }

      if (maxDistance && kom.miles > maxDistance && !excluded.includes(kom)) {
        excluded.push(kom);
      }

      if (
        watts &&
        kom.segmentLeaderboard?.leaderboardEntries[0]?.power > watts &&
        !excluded.includes(kom)
      ) {
        excluded.push(kom);
      }

      if (
        pace &&
        kom.segmentLeaderboard?.leaderboardEntries[0]?.pace < pace &&
        !excluded.includes(kom)
      ) {
        excluded.push(kom);
      }
    });

    const included = allRecommededKoms.filter((kom) => !excluded.includes(kom));

    return included;
  }
);
