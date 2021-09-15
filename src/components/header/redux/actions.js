import { getRecommendedKoms } from "../../common/api/recommendedKomsApi";
import * as SearchQuerySelectors from "./selectors";

export const setWatts = (payload) => ({
  type: "SEARCH_QUERY/SET_WATTS",
  payload,
});

export const setAddress = (payload) => ({
  type: "SEARCH_QUERY/SET_ADDRESS",
  payload,
});

export const setKoms = (payload) => ({
  type: "SEARCH_QUERY/SET_KOMS",
  payload,
});

/* ====================================== THUNK ACTIONS ========================================= */

export function fetchRecommendedKoms() {
  return function fetchRecommendedKomsThunk(dispatch, getState) {
    const state = getState();
    const watts = SearchQuerySelectors.selectWatts(state);
    const address = SearchQuerySelectors.selectAddress(state);

    const params = {
      watts: watts.toString(),
      address: address,
    };

    return getRecommendedKoms(params).then((data) => {
      dispatch(setKoms(data));
    });
  };
}
