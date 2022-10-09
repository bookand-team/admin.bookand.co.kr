import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';

import rootReducer from './reducers';

const isDev = process.env.NODE_ENV === 'development';

const createStore = () => {
  // 개발환경인 경우 logger 미들웨어 추가
  if (isDev) {
    const middleware = (getDefaultMiddleware) => getDefaultMiddleware().concat(logger);
    const store = configureStore({
      reducer: rootReducer,
      middleware: middleware,
      devTools: isDev,
    });
    return store;
  }

  const store = configureStore({
    reducer: rootReducer,
    devTools: isDev,
  });
  return store;
};

const wrapper = createWrapper(createStore, { debug: isDev });

export default wrapper;