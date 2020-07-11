import {
  ADD_FILTER,
  REMOVE_FILTER,
  TOGGLE_SEARCH_TYPE,
  CHANGE_KEY_WORD,
  CLEAR_FILTER,
} from "./actions";

const initState = {
  filters: [],
  type: "all",
  keyWord: "",
};

export default function (state = initState, action) {
  switch (action.type) {
    case ADD_FILTER: {
      return {
        ...state,
        filters: [...state.filters, { ...action.data }],
      };
    }
    case REMOVE_FILTER: {
      const valToBeRemoved = action.data.value;
      const newFilters = state.filters.filter(
        (filter) => filter.value !== valToBeRemoved
      );
      return {
        ...state,
        filters: newFilters,
      };
    }
    case TOGGLE_SEARCH_TYPE: {
      return {
        ...state,
        type: action.data.value,
      };
    }
    case CHANGE_KEY_WORD: {
      return {
        ...state,
        keyWord: action.data.value,
      };
    }
    case CLEAR_FILTER: {
      return {
        filters: [],
        type: "all",
        keyWord: "",
      };
    }
    default:
      return state;
  }
}
