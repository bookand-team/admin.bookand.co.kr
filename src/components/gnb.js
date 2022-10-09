import Link from 'next/link';
import { useSelector } from 'react-redux';

import styles from '../styles/gnb.module.css';

const Gnb = () => {
  const { section } = useSelector((state) => state.page);

  const globalMenu = [['dashboard', '대시보드'], ['article', '아티클'], ['bookstore', '등록서점관리'], ['member', '회원관리'], ['terms', '약관 및 정책'], ['notice', '공지사항'], ['push', 'PUSH'], ['report', '서점제보'], ['feedback', '피드백']];

  return (
    <nav className={styles.gnb}>
      <ul>
        {globalMenu.map((menu, idx) => {
          return (
            <Link key={idx} href={`${menu[0]}`}>
              {
                section === menu[0]
                  ? <a><li className={styles.current}>{`${menu[1]}`}</li></a>
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