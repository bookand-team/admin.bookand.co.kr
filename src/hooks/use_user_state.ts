import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@redux/reducers';
import { AppDispatch } from '@redux/store';
import { UserState } from '@types';

import type { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';

export const useUserState = (): [UserState, ThunkDispatch<any, undefined, AnyAction> & Dispatch<any>] => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  return [user, dispatch];
};