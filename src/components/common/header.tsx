import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import logoutIcon from '@images/box-arrow-right.svg';
import menuIcon from '@images/list.svg';
import { logout } from '@redux/actions/user';
import { RootState } from '@redux/reducers';
import { AppDispatch } from '@redux/store';
import styles from '@styles/components/common/header.module.scss';
import buttonStyles from '@styles/layout/button.module.scss';
import { GNBArr } from '@types';

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, logoutDone } = useSelector((state: RootState) => state.user);
  const { section } = useSelector((state: RootState) => state.page);

  // GNB 메뉴 열린 상태
  const [gnbOpend, setGnbOpend] = useState(false);

  /** 로그아웃 버튼 */
  const logoutBtnHandler = useCallback(() => {
    dispatch(logout());
  }, []);

  /** GNB 메뉴 버튼 */
  const menuBtnHandler = useCallback(() => {
    setGnbOpend((prev) => !prev);
  }, []);

  // 로그아웃 요청 결과 처리
  useEffect(() => {
    if (logoutDone) { router.push('/'); }
  }, [logoutDone]);

  return (
    <>
      <header className={styles.header}>
        <Link href='/dashboard'>
          <a>
            <nav className={styles.logo}>
              <span className={styles.front}>BOOK&</span>
              <span className={styles.back}>Service Admin</span>
            </nav>
          </a>
        </Link>
        {isLoggedIn &&
          <>
            <nav className={styles.user}>
              <span className={styles.username}>username</span>
              <button className={buttonStyles.logout} onClick={logoutBtnHandler}>로그아웃</button>
            </nav>
            <nav className={styles.tools}>
              <button onClick={logoutBtnHandler}>
                <Image src={logoutIcon} width={24} height={24} />
              </button>
              <button onClick={menuBtnHandler}>
                <Image src={menuIcon} width={24} height={24} />
              </button>
            </nav>
          </>
        }
      </header>
      {section &&
        <nav className={styles.gnb}>
          <ul className={gnbOpend ? styles.opend : styles.closed}>
            {GNBArr.map((menu, idx) => {
              return (
                <Link key={idx} href={`/${menu[0]}`}>
                  {section === menu[0]
                    ? <a className={styles.current}><li>{menu[1]}</li></a>
                    : <a><li>{menu[1]}</li></a>
                  }
                </Link>
              );
            })}
          </ul>
        </nav>
      }
    </>
  );
};

export default Header;