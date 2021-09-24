import get from "lodash/get";
import { isEmpty } from "lodash";
import { createSelector } from "reselect";
import * as SearchQuerySelectors from "../../header/redux/selectors";

export const selectRecommendedKoms = (state) =>
  get(state, `koms.recommendedKoms`);

export const selectIsLoading = (state) => get(state, `loadingBar.default`);

export const selectFilteredRecommendedKoms = createSelector(
  selectRecommendedKoms,
  SearchQuerySelectors.selectPositiveGrade,
  SearchQuerySelectors.selectMaxDistance,
  SearchQuerySelectors.selectMaxGrade,
  (allRecommededKoms, positiveGrade, maxDistance, maxGrade) => {
    if (isEmpty(allRecommededKoms)) return;

    const cases = {
      case1: !!(positiveGrade && !maxDistance && !maxGrade),
      case2: !!(positiveGrade && maxDistance && !maxGrade),
      case3: !!(positiveGrade && maxDistance && maxGrade),
      case4: !!(!positiveGrade && maxDistance && !maxGrade),
      case5: !!(!positiveGrade && maxDistance && maxGrade),
      case6: !!(positiveGrade && !maxDistance && maxGrade),
      case7: !!(!positiveGrade && !maxDistance && maxGrade),
    };

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
