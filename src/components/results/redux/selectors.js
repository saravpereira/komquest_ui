import get from "lodash/get";

export const selectRecommendedKoms = (state) => get(state, `koms.recommendedKoms`);
