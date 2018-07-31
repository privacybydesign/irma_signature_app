import { combineReducers } from 'redux';
import attributeSearch from './attributeSearch';
import storage from './storage';
import signatureVerify from './signatureVerify';
import settings from './settings';

const rootReducer = combineReducers({
  attributeSearch,
  storage,
  signatureVerify,
  settings,
});

export default rootReducer;
