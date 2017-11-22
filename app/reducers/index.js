import { combineReducers } from 'redux';
import attributes from './attribute-search';
import mail from './mail';

const rootReducer = combineReducers({
  mail,
  attributes,
});

export default rootReducer;
