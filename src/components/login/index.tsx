import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '@redux/actions/user';
import { RootState } from '@redux/reducers';
import { AppDispatch } from '@redux/store';
import styles from '@styles/components/login/login.module.scss';

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { loginDone, loginError } = useSelector((state: RootState) => state.user);

  /** 로그인 버튼 */
  const loginBtnHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login({ email: e.currentTarget.inputId.value, password: e.currentTarget.inputPassword.value }));
  }, []);

  // 로그인 요청 결과 처리
  useEffect(() => {
    if (loginDone) {
      router.replace('/dashboard');
    }
  }, [loginDone]);

  return (
    <section className={styles.container}>
      <h1>관리자 계정</h1>
      <form onSubmit={loginBtnHandler}>
        <input type='text' name='inputId' placeholder='아이디' required spellCheck='false' />
        <input type='password' name='inputPassword' placeholder='비밀번호' required spellCheck='false' />
        {loginError ? <div>아이디 또는 비밀번호를 잘못 입력했습니다.</div> : null}
        <button type='submit'>로그인</button>
      </form>
    </section>
  );
};

export default Login;