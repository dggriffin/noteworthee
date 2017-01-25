import { combineReducers } from 'redux';
import notes from './notes';
import currentRoute from './currentRoute';

const rootReducer = combineReducers({
  notes,
  currentRoute
});

export default rootReducer;
