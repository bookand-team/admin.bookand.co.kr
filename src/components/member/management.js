import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import styles from '../../styles/member/management.module.css';
import tableStyles from '../../styles/layout/table.module.css';
import Page from '../page';

const Management = () => {
  const { members, membersLength } = useSelector((state) => state.members);

  const tableRows = 10;
  const emptyArray = useCallback(() => {
    const ret = [];
    for (var i = 0; i < tableRows - membersLength; i++) {
      ret.push(null);
    }
    return ret;
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>회원 관리</h2>
        <div className={styles.search}>
          <div>
            <div>닉네임</div>
            <input />
          </div>
          <button>검색</button>
        </div>
      </div>
      <div className={styles.contents}>
        <div className={tableStyles.table}>
          <div className={tableStyles.thead}>
            <div className={tableStyles.tr}>
              <div className={styles.id}>번호</div>
              <div className={styles.nickname}>닉네임</div>
              <div className={styles.status}>상태</div>
              <div className={styles.type}>타입</div>
              <div className={styles.email}>email</div>
              <div className={styles.createdDate}>가입일</div>
              <div className={styles.connectedDate}>접속일</div>
              <div className={styles.details}></div>
            </div>
          </div>
          <ul>
            {members.map((member) => {
              return (
                <li key={member.id} className={tableStyles.tr}>
                  <div className={styles.id}>{member.id && member.id}</div>
                  <div className={styles.nickname}>{member.nickname && member.nickname}</div>
                  <div className={styles.status}>{member.status && member.status}</div>
                  <div className={styles.type}>{member.type && member.type}</div>
                  <div className={styles.email}>{member.email && member.email}</div>
                  <div className={styles.createdDate}>{member.createdDate && member.createdDate}</div>
                  <div className={styles.connectedDate}>{member.connectedDate && member.connectedDate}</div>
                  <div className={styles.details}><button>상세</button></div>
                </li>
              );
            })}
            {membersLength !== tableRows && emptyArray().map((member, idx) => {
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