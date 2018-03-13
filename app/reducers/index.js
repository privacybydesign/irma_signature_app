import { combineReducers } from 'redux';
import attributes from './attribute-search';
import verify from './signature-verify';
import mail from './mail';
import signatureRequests from './signature-requests';

const rootReducer = combineReducers({
  mail,
  attributes,
  verify,
  signatureRequests,
});

export default rootReducer;
