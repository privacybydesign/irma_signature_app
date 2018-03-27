import searchAttribute from './../utils/irma_cli_search/irma_cli_search';

// action types
export const ADD_ATTRIBUTE = 'add-attribute';
export const REMOVE_ATTRIBUTE = 'remove-attribute';
export const SET_SEARCH_RESULT = 'set-search-result';
export const START_SEARCH = 'start-search';

export function addAttribute(key, value) {
  return {
    type: ADD_ATTRIBUTE,
    key,
    value,
  };
}

export function removeAttribute(key) {
  return {
    type: REMOVE_ATTRIBUTE,
    key,
  };
}

export function setSearchResult(searchResult) {
  return {
    type: SET_SEARCH_RESULT,
    searchResult,
  };
}

export function startSearch() {
  return {
    type: START_SEARCH,
  };
}

export function searchAttributes(name) {
  return dispatch => {
    dispatch(startSearch());

    return searchAttribute(name)
      .then(searchResult => dispatch(setSearchResult(searchResult)));
  };
}
