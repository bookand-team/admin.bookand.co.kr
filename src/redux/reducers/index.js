import { combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import pageSlice from './page';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        page: pageSlice.reducer,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;