import get from "lodash/get";
import { createSelector } from "reselect";

export const selectWatts = (state) => get(state, `searchQuery.watts`);

export const selectAddress = (state) => get(state, `searchQuery.address`);

export const selectIsInputValid = createSelector(
  selectWatts,
  selectAddress,
  (watts, address) => watts && address
);
