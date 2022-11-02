import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import articleSlice from './acticle';
import articlesSlice from './articles';
import bookstoreSlice from './bookstore';
import bookstoresSlice from './bookstores';
import feedbackSlice from './feedback';
import feedbacksSlice from './feedbacks';
import imageSlice from './image';
import memberSlice from './member';
import membersSlice from './members';
import pageSlice from './page';
import pushSlice from './push';
import pushesSlice from './pushes';
import reportSlice from './report';
import reportsSlice from './reports';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        article: articleSlice.reducer,
        articles: articlesSlice.reducer,
        bookstore: bookstoreSlice.reducer,
        bookstores: bookstoresSlice.reducer,
        feedback: feedbackSlice.reducer,
        feedbacks: feedbacksSlice.reducer,
        image: imageSlice.reducer,
        member: memberSlice.reducer,
        members: membersSlice.reducer,
        page: pageSlice.reducer,
        push: pushSlice.reducer,
        pushes: pushesSlice.reducer,
        report: reportSlice.reducer,
        reports: reportsSlice.reducer,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;