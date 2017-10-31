import { combineReducers } from 'redux';
import {
  EXAMPLE_ACTION,
} from '../actions';

function example(
  state = {
    isFetching: false,
  },
  action
) {
  switch (action.type) {
    case EXAMPLE_ACTION:
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  example,
});

export default rootReducer;
