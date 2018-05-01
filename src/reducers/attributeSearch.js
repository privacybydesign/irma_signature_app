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
      return {
        ...state,
        attributeSearching: true,
      };
    case STORE_ATTRIBUTE_RESULT:
      return {
        ...state,
        attributeResult: action.attributeResult,
        attributeSearching: false,
      };
    default:
      return state;
  }
}
