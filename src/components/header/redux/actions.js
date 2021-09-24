export const setWatts = (payload) => ({
  type: "SEARCH_QUERY/SET_WATTS",
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
