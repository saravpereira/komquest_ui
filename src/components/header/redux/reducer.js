const defaults = {
  watts: null,
  address: null,
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
    default:
      return state;
  }
}
