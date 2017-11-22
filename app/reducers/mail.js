import {
  DETECT_MAIL_CLIENTS,
  SET_PREFERRED_MAIL_CLIENT,
} from '../actions';

export default function mail(
  state = {
    mailClients: new Map(),
    mailClientsDetected: false,
    preferredMailClient: null,
  },
  action
) {
  switch (action.type) {
    case DETECT_MAIL_CLIENTS:
      return Object.assign({}, state, {
        mailClients: action.mailClients,
        mailClientsDetected: true,
      });
    case SET_PREFERRED_MAIL_CLIENT:
      return Object.assign({}, state, {
        preferredMailClient: action.preferredMailClient,
      });
    default:
      return state;
  }
}
