const defaults = {
  watts: null,
  address: null,
  koms: null,
};

export default function searchQuery(state = defaults, action) {
  switch (action.type) {
    case "SEARCH_QUERY/SET_WATTS": {
      return {
        ...state,
        watts: action.payload,
      };
    }
    case "SEARCH_QUERY/SET_ADDRESS": {
      console.log()
      return {
        ...state,
        address: action.payload,
      };
    }
    case "SEARCH_QUERY/SET_KOMS": {
      return {
        ...state,
        koms: action.payload,
      };
    }
    default:
      return state;
  }
}
