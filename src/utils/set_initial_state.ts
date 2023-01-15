import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { GetServerSidePropsContext } from 'next/types';

import { setPage } from '@redux/reducers/page';
import { setLoginUser } from '@redux/reducers/user';
import { PageSection } from '@types';

/** 서버사이드에서 페이지 상태 설정 */
export const setPageState = (store: ToolkitStore, context: GetServerSidePropsContext, section: PageSection, row?: number) => {
  store.dispatch(setPage({
    section: section,
    category: context.query.category ? context.query.category : null,
    theme: context.query.theme ? context.query.theme : null,
    page: context.query.page ? Number(context.query.page) : 1,
    role: context.query.role ? context.query.role : null,
    row: row,
    search: context.query.search ? context.query.search : null,
    status: context.query.status ? context.query.status : null
  }));
};

/** 서버사이드에서 유저 상태 설정 */
export const setUserState = (store: ToolkitStore, context: GetServerSidePropsContext) => {
  store.dispatch(setLoginUser({
    aceessToken: context.req.cookies['accessToken'] ? context.req.cookies['accessToken'] : '',
    refreshToken: context.req.cookies['refreshToken'] ? context.req.cookies['refreshToken'] : ''
  }));
};