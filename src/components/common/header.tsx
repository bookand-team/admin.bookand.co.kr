import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@redux/reducers';
import styles from '@styles/common/header.module.css';
import buttonStyles from '@styles/layout/button.module.css';

const Header = () => {
  const router = useRouter();
  const { section } = useSelector((state: RootState) => state.page);

  /** 로그아웃 버튼 - 로그아웃 요청 */
  const logoutBtnHandler = useCallback(() => {
    // TODO: 로그아웃 요청 기능
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
      {section === 'login' ? null :
        <div className={styles.user}>
          <div className={styles.username}>username</div>
          <button className={buttonStyles.logout} onClick={logoutBtnHandler}>로그아웃</button>
        </div>
      }
    </header>
  );
};

export default Header;