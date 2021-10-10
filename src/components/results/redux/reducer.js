const defaults = {
  recommendedKoms: [],
  recommendationType: "cycling",
};

export default function komsReducer(state = defaults, action) {
  switch (action.type) {
    case "KOMS/SET_RECOMMENDED_KOMS": {
      return {
        ...state,
        recommendedKoms: action.payload,
      };
    }
    case "KOMS/SET_RECOMMENDATION_TYPE": {
      return {
        ...state,
        recommendationType: action.payload,
      };
    }
    case "KOMS/RESET_RECOMMENDATIONS": {
      return {
        ...state,
        recommendedKoms: defaults.recommendedKoms,
        recommendationType: defaults.recommendationType,
      };
    }
    default:
      return state;
  }
}
