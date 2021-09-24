import get from "lodash/get";
import { createSelector } from "reselect";

export const selectWatts = (state) => get(state, `searchQuery.watts`);

export const selectAddress = (state) => get(state, `searchQuery.address`);

export const selectPositiveGrade = (state) =>
  get(state, `searchQuery.positiveGrade`);

export const selectMaxDistance = (state) =>
  get(state, `searchQuery.maxDistance`);

export const selectMaxGrade = (state) => get(state, `searchQuery.maxGrade`);

export const selectIsInputValid = createSelector(
  selectWatts,
  selectAddress,
  (watts, address) => watts && address
);

export const selectPermutationFilterCases = createSelector(
  selectPositiveGrade,
  selectMaxDistance,
  selectMaxGrade,
  (positiveGrade, maxDistance, maxGrade) => {
    return {
      case1: !!(positiveGrade && !maxDistance && !maxGrade),
      case2: !!(positiveGrade && maxDistance && !maxGrade),
      case3: !!(positiveGrade && maxDistance && maxGrade),
      case4: !!(!positiveGrade && maxDistance && !maxGrade),
      case5: !!(!positiveGrade && maxDistance && maxGrade),
      case6: !!(positiveGrade && !maxDistance && maxGrade),
      case7: !!(!positiveGrade && !maxDistance && maxGrade),
    };
  }
);
