import { combineReducers } from 'redux';
import attributeSearch from './attributeSearch';
import storage from './storage';
import signatureVerify from './signatureVerify';

const rootReducer = combineReducers({
  attributeSearch,
  storage,
  signatureVerify,
});

export default rootReducer;
