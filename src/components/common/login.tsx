import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import styles from '@styles/login.module.css';

const Login = () => {
  const router = useRouter();

  /**
   * 로그인 실행 함수
   * 
   * TODO: [임시] id:admin, pwd:1234 입력시 dashboard 페이지로 이동
   */
  const loginHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (e.currentTarget.inputId.value !== 'admin') {
      alert('잘못된 아이디입니다.');
    } else if (e.currentTarget.inputPassword.value !== '1234') {
      alert('잘못된 비밀번호입니다.');
    } else {
      router.push('/dashboard');
    }
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.header}>관리자 계정</div>
      <form onSubmit={loginHandler}>
        <input className={styles.id} type='text' name='inputId' placeholder='아이디' required />
        <input className={styles.password} type='password' name='inputPassword' placeholder='비밀번호' required />
        <button type='submit'>로그인</button>
      </form>
    </main>
  );
};

export default Login;