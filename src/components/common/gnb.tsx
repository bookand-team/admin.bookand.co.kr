import Link from 'next/link';
import { useSelector } from 'react-redux';

import { RootState } from '@redux/reducers';
import styles from '@styles/components/common/gnb.module.scss';
import { GNBArr } from '@types';

const Gnb = () => {
  const { section } = useSelector((state: RootState) => state.page);

  return (
    <>
      {section !== 'login' &&
        <nav className={styles.gnb}>
          <ul>
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

export default Gnb;