import { getRecommendedKoms } from "../../common/api/recommendedKomsApi";
import * as SearchQuerySelectors from "../../header/redux/selectors";
import { mockData } from "./mockData";

export const setRecommendedKoms = (payload) => ({
  type: "KOMS/SET_RECOMMENDED_KOMS",
  payload,
});

/* ====================================== THUNK ACTIONS ========================================= */

export function fetchRecommendedKoms() {
  return function fetchRecommendedKomsThunk(dispatch, getState) {
    //dispatch(setRecommendedKoms(mockData));

    const state = getState();
    const watts = SearchQuerySelectors.selectWatts(state);
    const address = SearchQuerySelectors.selectAddress(state);

    const params = {
      watts: watts.toString(),
      address: address
    };

    return getRecommendedKoms(params).then((data) => {
      dispatch(setRecommendedKoms(data));
    });
  };
}
