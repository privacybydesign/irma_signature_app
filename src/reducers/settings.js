import { SET_DEFAULT_RETURN_EMAIL, LOAD_SETTINGS } from '../actions';

export default function settings(state = {defaultReturnEmail: ''}, action) {
  switch (action.type) {
    case SET_DEFAULT_RETURN_EMAIL:
      return {
        ...state,
        defaultReturnEmail: action.email,
      };
    case LOAD_SETTINGS:
      return {
        ...action.settings,
      };
    default:
      return state;
  }
}
