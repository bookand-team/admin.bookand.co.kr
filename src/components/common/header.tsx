import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@redux/reducers';
import styles from '@styles/common/header.module.css';
import buttonStyles from '@styles/layout/button.module.css';

const Header = () => {
  const router = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  /** 로그아웃 버튼 - 로그아웃 요청 */
  const logoutBtnHandler = useCallback(() => {
    Cookies.remove('refreshToken');
    router.push('/');
  }, []);
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