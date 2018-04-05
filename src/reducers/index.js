import { combineReducers } from 'redux';
import mail from './mail';
import attributeSearch from './attributeSearch';

const rootReducer = combineReducers({
  mail,
  attributeSearch,
});

export default rootReducer;
