import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import articleSlice from '@redux/reducers/acticle';
import bookstoreSlice from '@redux/reducers/bookstore';
import feedbackSlice from '@redux/reducers/feedback';
import imageSlice from '@redux/reducers/image';
import memberSlice from '@redux/reducers/member';
import pageSlice from '@redux/reducers/page';
import pushSlice from '@redux/reducers/push';
import reportSlice from '@redux/reducers/report';
import userSlice from '@redux/reducers/user';
import { ArticleState, BookstoreState, FeedbackState, ImageState, MemberState, PageState, PushState, ReportState, UserState } from '@types';

const rootReducer = (state: any, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    default: {
      const combineReducer = combineReducers({
        article: articleSlice.reducer,
        bookstore: bookstoreSlice.reducer,
        feedback: feedbackSlice.reducer,
        image: imageSlice.reducer,
        member: memberSlice.reducer,
        page: pageSlice.reducer,
        push: pushSlice.reducer,
        report: reportSlice.reducer,
        user: userSlice.reducer
      });
      return combineReducer(state, action);
    }
  }
};

export type RootState = {
  article: ArticleState;
  bookstore: BookstoreState;
  feedback: FeedbackState;
  image: ImageState;
  member: MemberState;
  page: PageState;
  push: PushState;
  report: ReportState;
  user: UserState;
};

export default rootReducer;