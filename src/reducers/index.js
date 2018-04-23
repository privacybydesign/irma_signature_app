import { combineReducers } from 'redux';
import mail from './mail';
import attributeSearch from './attributeSearch';
import storage from './storage';
import signatureVerify from './signatureVerify';

const rootReducer = combineReducers({
  mail,
  attributeSearch,
  storage,
  signatureVerify,
});

export default rootReducer;
