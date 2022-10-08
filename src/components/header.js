import Link from 'next/link';

import styles from '../styles/header.module.css';

const Header = () => {
  return (
    <>
      <div className={styles.container}>
        <Link href='/dashboard'>
          <a>
            <div className={styles.logo}>
              <div className={styles.front}>{`BOOK&`}</div>
              <div className={styles.back}>{`Service Admin`}</div>
            </div>
          </a>
        </Link>
        <div className={styles.user}>
          <div className={styles.username}>{`username`}</div>
          <button className={styles.logout}>{`로그아웃`}</button>
        </div>
      </div>
    </>
  );
};

export default Header;