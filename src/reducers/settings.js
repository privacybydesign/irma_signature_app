import { SET_DEFAULT_RETURN_EMAIL, SET_DEFAULT_SAVE_DIRECTORY, LOAD_SETTINGS } from '../actions';

export default function settings(state = {defaultReturnEmail: '', defaultSaveDirectory: ''}, action) {
  switch (action.type) {
    case SET_DEFAULT_RETURN_EMAIL:
      return {
        ...state,
        defaultReturnEmail: action.email,
      };
    case SET_DEFAULT_SAVE_DIRECTORY:
      return {
        ...state,
        defaultSaveDirectory: action.path,
      };
    case LOAD_SETTINGS:
      return {
        ...action.settings,
      };
    default:
      return state;
  }
}
