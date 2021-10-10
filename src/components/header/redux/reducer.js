const defaults = {
  pace: "",
  watts: "",
  address: "",
  koms: null,
  positiveGrade: false,
  maxDistance: null,
  maxGrade: null,
};

export default function searchQuery(state = defaults, action) {
  switch (action.type) {
    case "SEARCH_QUERY/SET_PACE": {
      return {
        ...state,
        pace: action.payload,
      };
    }
    case "SEARCH_QUERY/SET_WATTS": {
      return {
        ...state,
        watts: action.payload,
      };
    }
    case "SEARCH_QUERY/SET_ADDRESS": {
      return {
        ...state,
        address: action.payload,
      };
    }
    case "SEARCH_QUERY/SET_POSITIVE_GRADE": {
      return {
        ...state,
        positiveGrade: action.payload,
      };
    }
    case "SEARCH_QUERY/SET_MAX_DISTANCE": {
      return {
        ...state,
        maxDistance: action.payload,
      };
    }
    case "SEARCH_QUERY/SET_MAX_GRADE": {
      return {
        ...state,
        maxGrade: action.payload,
      };
    }
    case "SEARCH_QUERY/RESET_ADVANCE_SEARCH": {
      return {
        ...state,
        positiveGrade: defaults.positiveGrade,
        maxDistance: defaults.maxDistance,
        maxGrade: defaults.maxGrade,
        watts: defaults.watts,
        pace: defaults.pace,
      };
    }
    case "SEARCH_QUERY/RESET_ADDRESS": {
      return {
        ...state,
        address: defaults.address,
      };
    }
    default:
      return state;
  }
}
