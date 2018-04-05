import {
  STORE_ATTRIBUTE_RESULT,
  START_ATTRIBUTE_SEARCH,
} from '../actions';

export default function mail(
  state = {
    attributeResult: [],
    attributeSearching: false,
  },
  action
) {
  switch (action.type) {
    case START_ATTRIBUTE_SEARCH:
      return Object.assign({}, state, {
        attributeSearching: true,
      });
    case STORE_ATTRIBUTE_RESULT:
      return Object.assign({}, state, {
        attributeResult: action.attributeResult,
        attributeSearching: false,
      });
    default:
      return state;
  }
}
