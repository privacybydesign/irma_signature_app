import {
  ADD_ATTRIBUTE,
  REMOVE_ATTRIBUTE,
  SET_SEARCH_RESULT,
  START_SEARCH,
} from '../actions';

export default function attributes(
  state = {
    attributes: new Map(),
    searchResult: {},
    searchPending: false,
  },
  action
) {
  switch (action.type) {
    case ADD_ATTRIBUTE: {
      const clone = new Map(state.attributes);
      clone.set(action.key, action.value);
      return Object.assign({}, state, {
        attributes: clone,
      });
    } case REMOVE_ATTRIBUTE: {
      const clone = new Map(state.attributes);
      clone.delete(action.key);
      return Object.assign({}, state, {
        attributes: clone,
      });
    } case START_SEARCH:
      return Object.assign({}, state, {
        searchPending: true,
      });
    case SET_SEARCH_RESULT:
      return Object.assign({}, state, {
        searchResult: action.searchResult,
        searchPending: false,
      });
    default:
      return state;
  }
}
