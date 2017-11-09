import { combineReducers } from 'redux';
import {
  DETECT_MAIL_CLIENTS,
} from '../actions';

function mail(
  state = {
    mailClients: new Map(),
    mailClientsDetected: false,
  },
  action
) {
  switch (action.type) {
    case DETECT_MAIL_CLIENTS:
      return Object.assign({}, state, {
        mailClients: action.mailClients,
        mailClientsDetected: true,
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  mail,
});

export default rootReducer;
