import Link from 'next/link';
import { useSelector } from 'react-redux';

import styles from '../styles/gnb.module.css';

import type { RootState } from 'src/redux/reducers';

const Gnb = () => {
  const { section } = useSelector((state: RootState) => state.page);

  const globalMenu = [['dashboard', '대시보드'], ['article', '아티클'], ['bookstore', '서점'], ['member', '회원'], ['push', '푸시'], ['feedback', '피드백'], ['report', '제보서점'], ['notice', '공지사항'], ['terms', '약관 및 정책']];

  return (
    <nav className={styles.gnb}>
      <ul>
        {globalMenu.map((menu, idx) => {
          return (
            <Link key={idx} href={`/${menu[0]}`}>
              {
                section === menu[0]
                  ? <a className={styles.current}><li>{`${menu[1]}`}</li></a>
                  : <a><li>{`${menu[1]}`}</li></a>
              }
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default Gnb;