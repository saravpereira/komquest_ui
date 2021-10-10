import { batchActions } from "redux-batched-actions";
import * as KomsActions from "../../results/redux/actions";

export const setWatts = (payload) => ({
  type: "SEARCH_QUERY/SET_WATTS",
  payload,
});

export const setPace = (payload) => ({
  type: "SEARCH_QUERY/SET_PACE",
  payload,
});

export const setAddress = (payload) => ({
  type: "SEARCH_QUERY/SET_ADDRESS",
  payload,
});

export const setPositiveGrade = (payload) => ({
  type: "SEARCH_QUERY/SET_POSITIVE_GRADE",
  payload,
});

export const setMaxDistance = (payload) => ({
  type: "SEARCH_QUERY/SET_MAX_DISTANCE",
  payload,
});

export const setMaxGrade = (payload) => ({
  type: "SEARCH_QUERY/SET_MAX_GRADE",
  payload,
});

export const resetAdvanceSearch = () => ({
  type: "SEARCH_QUERY/RESET_ADVANCE_SEARCH",
});

export const resetAddress = () => ({
  type: "SEARCH_QUERY/RESET_ADDRESS",
});

/* ====================================== THUNK ACTIONS ========================================= */

export function updateAllParams({
  address,
  recommendationType,
}) {
  return function updateAllParamsThunk(dispatch) {
    dispatch(
      batchActions([
        setAddress(address),
        KomsActions.setRecommendationType(recommendationType),
      ])
    );
  };
}

export function resetAllParams() {
  return function resetAllParamsThunk(dispatch) {
    dispatch(
      batchActions([
        resetAdvanceSearch(),
        resetAddress(),
        KomsActions.resetRecommendations(),
      ])
    );
  };
}
