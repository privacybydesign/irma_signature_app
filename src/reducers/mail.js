import {
  STORE_MAIL_CLIENTS,
  SET_PREFERRED_MAIL_CLIENT,
} from '../actions';

export default function mail(
  state = {
    mailClients: new Map(),
    mailClientsDetected: false,
    preferredMailClient: '',
  },
  action
) {
  switch (action.type) {
    case STORE_MAIL_CLIENTS: {
      const clientNames = Object.keys(action.mailClients);
      return {
        ...state,
        mailClients: action.mailClients,
        mailClientsDetected: true,
        preferredMailClient: (state.preferredMailClient === '' && clientNames.length > 0) ? clientNames[0] : state.preferredMailClient,
      };
    }
    case SET_PREFERRED_MAIL_CLIENT:
      return {
        ...state,
        preferredMailClient: action.clientName,
      };
    default:
      return state;
  }
}
