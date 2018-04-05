import { searchAttributesElectron } from './electron.js';

export const STORE_ATTRIBUTE_RESULT = 'store-attribute-result';
export const START_ATTRIBUTE_SEARCH = 'start-attribute-search';

export function startAttributeSearch() {
  return {
    type: START_ATTRIBUTE_SEARCH,
  };
}

export function searchAttributes() {
  return dispatch => {
    dispatch(startAttributeSearch());
    return searchAttributesElectron();
  }
}
