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
        watts: defaults.watts,
      };
    }
    case "SEARCH_QUERY/SET_ADDRESS": {
      return {
        ...state,
        address: defaults.address,
      };
    }
    case "SEARCH_QUERY/SET_KOMS": {
      return {
        ...state,
        koms: defaults.koms,
      };
    }
    default:
      return state;
  }
}
