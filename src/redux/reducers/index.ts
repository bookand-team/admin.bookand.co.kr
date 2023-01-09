import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import articleSlice from '@redux/reducers/acticle';
import articlesSlice from '@redux/reducers/articles';
import bookstoreSlice from '@redux/reducers/bookstore';
import bookstoresSlice from '@redux/reducers/bookstores';
import feedbackSlice from '@redux/reducers/feedback';
import feedbacksSlice from '@redux/reducers/feedbacks';
import imageSlice from '@redux/reducers/image';
import memberSlice from '@redux/reducers/member';
import membersSlice from '@redux/reducers/members';
import pageSlice from '@redux/reducers/page';
import pushSlice from '@redux/reducers/push';
import pushesSlice from '@redux/reducers/pushes';
import reportsSlice from '@redux/reducers/reports';
import userSlice from '@redux/reducers/user';
import { ArticleState, ArticlesState, BookstoreState, BookstoresState, FeedbackState, FeedbacksState, ImageState, MemberState, MembersState, PageState, PushState, PushesState, ReportState, UserState } from '@types';

const rootReducer = (state: any, action: any) => {
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
        reports: reportsSlice.reducer,
        user: userSlice.reducer
      });
      return combineReducer(state, action);
    }
  }
};

export type RootState = {
  article: ArticleState;
  articles: ArticlesState;
  bookstore: BookstoreState;
  bookstores: BookstoresState;
  feedback: FeedbackState;
  feedbacks: FeedbacksState;
  image: ImageState;
  member: MemberState;
  members: MembersState;
  page: PageState;
  push: PushState;
  pushes: PushesState;
  reports: ReportState;
  user: UserState;
};

export default rootReducer;