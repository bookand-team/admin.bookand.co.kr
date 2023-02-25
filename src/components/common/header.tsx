import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '@redux/actions/user';
import { RootState } from '@redux/reducers';
import { AppDispatch } from '@redux/store';
import styles from '@styles/common/header.module.css';
import buttonStyles from '@styles/layout/button.module.css';

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, token, logoutDone } = useSelector((state: RootState) => state.user);

  /** 로그아웃 버튼 */
  const logoutBtnHandler = useCallback(() => {
    if (token) {
      dispatch(logout(token.accessToken));
    }
  }, []);

  // 로그아웃 요청 결과 처리
  useEffect(() => {
    if (logoutDone) {
      router.push('/');
    }
  }, [logoutDone]);

  return (
    <header className={styles.container}>
      <Link href='/dashboard'>
        <a>
          <div className={styles.logo}>
            <div className={styles.front}>BOOK&</div>
            <div className={styles.back}>Service Admin</div>
          </div>
        </a>
      </Link>
      {isLoggedIn &&
        <div className={styles.user}>
          <div className={styles.username}>username</div>
          <button className={buttonStyles.logout} onClick={logoutBtnHandler}>로그아웃</button>
        </div>
      }
    </header>
  );
};

export default Header;