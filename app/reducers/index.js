import { combineReducers } from 'redux';
import attributes from './attribute-search';
import verify from './signature-verify';
import mail from './mail';

const rootReducer = combineReducers({
  mail,
  attributes,
  verify,
});

export default rootReducer;
