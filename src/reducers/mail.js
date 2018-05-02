import {
  STORE_MAIL_CLIENTS,
  GET_PREFERRED_MAIL_CLIENT,
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
    case STORE_MAIL_CLIENTS:
      return {
        ...state,
        mailClients: action.mailClients,
        mailClientsDetected: true,
      };
    case GET_PREFERRED_MAIL_CLIENT:
      const clientNames = Object.keys(state.mailClients);
      return {
        ...state,
        preferredMailClient: // Set a preferred mailclient in state if available and not set
          (action.preferredMailClient === '' && clientNames.length > 0 ) ? clientNames[0] : action.preferredMailClient,
      };
    default:
      return state;
  }
}
