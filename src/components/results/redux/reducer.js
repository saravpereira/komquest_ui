const defaults = {
  recommendedKoms: null,
};

export default function komsReducer(state = defaults, action) {
  switch (action.type) {
    case "KOMS/SET_RECOMMENDED_KOMS": {
      return {
        ...state,
        recommendedKoms: action.payload,
      };
    }
    default:
      return state;
  }
}
