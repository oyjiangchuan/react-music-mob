import { combineReducers } from 'redux-immutable';
import { reducer as recommendReducer } from '../pages/Recommend/store/index';
import { reducer as singersReducer } from '../pages/Singers/store/index';

export default combineReducers({
  recommend: recommendReducer,
  singers: singersReducer
})