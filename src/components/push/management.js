import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import styles from '../../styles/push/management.module.css';
import tableStyles from '../../styles/layout/table.module.css';
import Page from '../page';

const Management = () => {
  const { pushes, pushesLength } = useSelector(state => state.pushes);

  const tableRows = 5;
  const emptyArray = useCallback(() => {
    const ret = [];
    for (var i = 0; i < tableRows - pushesLength; i++) {
      ret.push(null);
    }
    return ret;
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>PUSH 관리</h2>
      </div>
      <div className={styles.contents}>
        <div className={tableStyles.table}>
          <div className={tableStyles.thead}>
            <div className={tableStyles.tr}>
              <div className={styles.id}>번호</div>
              <div className={styles.category}>카테고리</div>
              <div className={styles.title}>제목</div>
              <div className={styles.status}>전송상태</div>
              <div className={styles.createdDate}>등록일자</div>
              <div className={styles.sentDate}>전송날짜</div>
            </div>
          </div>
          <ul>
            {pushes.map((push) => {
              return (
                <li key={push.id} className={tableStyles.tr}>
                  <div className={styles.id}>{push.id && push.id}</div>
                  <div className={styles.category}>{push.category && push.category}</div>
                  <div className={styles.title}>{push.title && push.title}</div>
                  <div className={styles.status}>{push.status && push.status}</div>
                  <div className={styles.createdDate}>{push.createdDate && push.createdDate}</div>
                  <div className={styles.sentDate}>{push.sentDate && push.sentDate}</div>
                </li>
              );
            })}
            {pushesLength !== tableRows && emptyArray().map((push, idx) => {
              return (
                <li key={idx} className={tableStyles.tr}></li>
              );
            })}
          </ul>
        </div>
      </div>
      <Page />
    </div>
  );
};

export default Management;