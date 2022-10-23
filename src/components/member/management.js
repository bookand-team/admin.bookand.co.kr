import { useSelector } from 'react-redux';

import getDisplayTime from '../../hooks/get_display_time';
import { isRowInsufficient, makeEmptyArray } from '../../hooks/maintain_table_layout';
import styles from '../../styles/member/management.module.css';
import tableStyles from '../../styles/layout/table.module.css';
import Page from '../page';
import Search from '../search';

const Management = () => {
  const { members, membersLength } = useSelector((state) => state.members);
  const { page } = useSelector((state) => state.page);

  const tableRow = 10;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>회원 관리</h2>
        <Search search='닉네임' />
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
              <div className={styles.accessedDate}>접속일</div>
              <div className={styles.details}></div>
            </div>
          </div>
          <ul>
            {members && members.map((member) => {
              return (
                <li key={member.id} className={tableStyles.tr}>
                  <div className={styles.id}>{member.id && member.id}</div>
                  <div className={styles.nickname}>{member.nickname && member.nickname}</div>
                  <div className={styles.status}>{member.status && member.status}</div>
                  <div className={styles.type}>{member.type && member.type}</div>
                  <div className={styles.email}>{member.email && member.email}</div>
                  <div className={styles.createdDate}>{member.createdDate && getDisplayTime(member.createdDate, 'yyyy-mm-dd hh:mm')}</div>
                  <div className={styles.accessedDate}>{member.accessedDate && getDisplayTime(member.accessedDate, 'yyyy-mm-dd hh:mm')}</div>
                  <div className={styles.details}><button>상세</button></div>
                </li>
              );
            })}
            {isRowInsufficient(page, tableRow, membersLength) && makeEmptyArray(page, tableRow, membersLength).map((member, idx) => {
              return (
                <li key={idx} className={tableStyles.tr}></li>
              );
            })}
          </ul>
        </div>
      </div>
      <Page tableRow={tableRow} contentsLength={membersLength} />
    </div>
  );
};

export default Management;