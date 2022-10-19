import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import articlesSlice from './articles';
import bookstoresSlice from './bookstores';
import feedbacksSlice from './feedbacks';
import membersSlice from './members';
import pageSlice from './page';
import pushesSlice from './pushes';
import reportsSlice from './reports';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        articles: articlesSlice.reducer,
        bookstores: bookstoresSlice.reducer,
        feedbacks: feedbacksSlice.reducer,
        members: membersSlice.reducer,
        page: pageSlice.reducer,
        pushes: pushesSlice.reducer,
        reports: reportsSlice.reducer,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;