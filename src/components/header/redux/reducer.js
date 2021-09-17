const defaults = {
  watts: "",
  address: "",
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
      return {
        ...state,
        address: action.payload,
      };
    }
    default:
      return state;
  }
}
