import get from "lodash/get";
import { isEmpty } from "lodash";
import { createSelector } from "reselect";
import * as SearchQuerySelectors from "../../header/redux/selectors";

export const selectRecommendedKoms = (state) =>
  get(state, `koms.recommendedKoms`);

export const selectIsLoading = (state) => get(state, `loadingBar.default`);

export const selectFilteredRecommendedKoms = createSelector(
  selectRecommendedKoms,
  SearchQuerySelectors.selectMaxDistance,
  SearchQuerySelectors.selectMaxGrade,
  SearchQuerySelectors.selectPermutationFilterCases,
  (allRecommededKoms, maxDistance, maxGrade, cases) => {
    if (isEmpty(allRecommededKoms)) return;

    return allRecommededKoms.filter((kom) => {
      if (cases.case1) {
        return kom.segment.averageGrade > 0;
      } else if (cases.case2) {
        return kom.segment.averageGrade > 0 && kom.miles <= maxDistance;
      } else if (cases.case3) {
        return (
          kom.segment.averageGrade > 0 &&
          kom.miles <= maxDistance &&
          kom.segment.averageGrade <= maxGrade
        );
      } else if (cases.case4) {
        return kom.miles <= maxDistance;
      } else if (cases.case5) {
        return kom.miles <= maxDistance && kom.segment.averageGrade <= maxGrade;
      } else if (cases.case6) {
        return kom.segment.averageGrade > 0 && kom.segment.averageGrade <= maxGrade;
      } else if (cases.case7) {
        return kom.segment.averageGrade <= maxGrade;
      }
      return kom
    });
  }
);
