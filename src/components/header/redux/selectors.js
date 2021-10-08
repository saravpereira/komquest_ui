import get from "lodash/get";

export const selectWatts = (state) => get(state, `searchQuery.watts`);

export const selectPace = (state) => get(state, `searchQuery.pace`);

export const selectAddress = (state) => get(state, `searchQuery.address`);

export const selectPositiveGrade = (state) =>
  get(state, `searchQuery.positiveGrade`);

export const selectMaxDistance = (state) =>
  get(state, `searchQuery.maxDistance`);

export const selectMaxGrade = (state) => get(state, `searchQuery.maxGrade`);
