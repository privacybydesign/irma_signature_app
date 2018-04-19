import { combineReducers } from 'redux';
import mail from './mail';
import attributeSearch from './attributeSearch';
import storage from './storage';

const rootReducer = combineReducers({
  mail,
  attributeSearch,
  storage,
});

export default rootReducer;
