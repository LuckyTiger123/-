export const ADD_FILTER = "ADD_FILTER";
export const REMOVE_FILTER = "REMOVE_FILTER";
export const TOGGLE_SEARCH_TYPE = "TOGGLE_SEARCH_TYPE";
export const CHANGE_KEY_WORD = "CHANGE_KEY_WORD";
export const CLEAR_FILTER = "CLEAR_FILTER";

export const addFilter = (data) => ({ type: ADD_FILTER, data });
export const removeFilter = (data) => ({ type: REMOVE_FILTER, data });
export const toggleSearchType = (data) => ({ type: TOGGLE_SEARCH_TYPE, data });
export const changeKeyword = (data) => ({ type: CHANGE_KEY_WORD, data });
export const clearFilter = () => ({ type: CLEAR_FILTER });
