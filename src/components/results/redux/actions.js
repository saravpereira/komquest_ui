import { showLoading, hideLoading } from "react-redux-loading-bar";
import {
  getRecommendedCycling,
  getRecommendedRunning,
} from "../../common/api/recommendedKomsApi";
import * as SearchQuerySelectors from "../../header/redux/selectors";
import * as ResultsSelectors from "./selectors";

export const setRecommendedKoms = (payload) => ({
  type: "KOMS/SET_RECOMMENDED_KOMS",
  payload,
});

export const setRecommendationType = (payload) => ({
  type: "KOMS/SET_RECOMMENDATION_TYPE",
  payload,
});

export const resetRecommendations = (payload) => ({
  type: "KOMS/RESET_RECOMMENDATIONS",
  payload,
});

/* ====================================== THUNK ACTIONS ========================================= */

export function fetchRecommendedKoms() {
  return function fetchRecommendedKomsThunk(dispatch, getState) {
    dispatch(showLoading());

    const state = getState();
    const address = SearchQuerySelectors.selectAddress(state);
    const recommendationType = ResultsSelectors.selectRecommendationType(state);

    const params = {
      address: address,
    };

    if (recommendationType === "cycling") {
      return getRecommendedCycling(params)
        .then((data) => {
          dispatch(setRecommendedKoms(data));
          dispatch(hideLoading());
        })
        .catch(() => {
          dispatch(hideLoading());
        });
    } else if (recommendationType === "running") {
      return getRecommendedRunning(params)
        .then((data) => {
          dispatch(setRecommendedKoms(data));
          dispatch(hideLoading());
        })
        .catch(() => {
          dispatch(hideLoading());
        });
    }

    dispatch(hideLoading());
    return TypeError("Recommendation Type needs to be in Watts or Pace");
  };
}
