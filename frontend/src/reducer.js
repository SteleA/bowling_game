import { combineReducers } from 'redux';
import bowling from './modules/bowling-module';

const rootReducer = combineReducers({
  bowling,
});

export default rootReducer;
