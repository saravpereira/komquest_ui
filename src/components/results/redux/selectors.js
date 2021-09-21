import get from "lodash/get";

export const selectRecommendedKoms = (state) => get(state, `koms.recommendedKoms`);

export const selectIsLoading = (state) => get(state, `loadingBar.default`);
