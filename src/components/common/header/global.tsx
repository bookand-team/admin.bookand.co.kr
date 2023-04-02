import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import logoutIcon from '@images/box-arrow-right.svg';
import menuIcon from '@images/list.svg';
import { logout } from '@redux/actions/user';
import { RootState } from '@redux/reducers';
import { setGnbOpend } from '@redux/reducers/page';
import { AppDispatch } from '@redux/store';
import styles from '@styles/components/common/header/global.module.scss';
import buttonStyles from '@styles/layout/button.module.scss';
import { GNBArr } from '@types';

const GlobalHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn, logoutDone } = useSelector((state: RootState) => state.user);
  const { section, gnbOpend } = useSelector((state: RootState) => state.page);

  /** 로그아웃 버튼 */
  const logoutBtnHandler = useCallback(() => {
    dispatch(logout());
  }, []);

  /** GNB 메뉴 버튼 */
  const menuBtnHandler = useCallback(() => {
    dispatch(setGnbOpend(!gnbOpend));
  }, [gnbOpend]);

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
      {section !== 'login' &&
        <nav className={styles.gnb}>
          <ul className={gnbOpend ? styles.opend : undefined}>
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

export default GlobalHeader;