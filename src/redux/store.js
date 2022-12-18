import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';

import rootReducer from './reducers';

const isDev = process.env.NODE_ENV === 'development';

const makeStore = () => {
  // 개발환경인 경우 logger 미들웨어 추가
  const store = isDev
    ? configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
      devTools: isDev
    })
    : configureStore({
      reducer: rootReducer,
      devTools: isDev
    });

  return store;
};

const wrapper = createWrapper(makeStore, { debug: isDev });

export default wrapper;