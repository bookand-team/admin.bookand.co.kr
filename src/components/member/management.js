import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import changeQuery from '../../hooks/change_query';
import getDisplayTime from '../../hooks/get_display_time';
import { isRowInsufficient, makeEmptyArray } from '../../hooks/maintain_table_layout';
import useInput from '../../hooks/use_input';
import styles from '../../styles/member/management.module.css';
import tableStyles from '../../styles/layout/table.module.css';
import Page from '../page';
import Search from '../search';

const Management = () => {
  const router = useRouter();
  const { members, membersLength } = useSelector((state) => state.members);
  const { page, row } = useSelector((state) => state.page);

  // role 선택
  const [selectRole, changeSelectRole] = useInput('');
  useEffect(() => {
    const newQuery = changeQuery(router, { role: selectRole });
    router.push(`${router.pathname}${newQuery}`);
  }, [selectRole]);

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
              <div className={styles.type}>
                <select value={selectStatus} onChange={changeSelectStatus}>
                  <option value=''>역할</option>
                  <option value='일반'>일반</option>
                  <option value='관리자'>관리자</option>
                </select>
              </div>
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
            {isRowInsufficient(page, row, membersLength) && makeEmptyArray(page, row, membersLength).map((member, idx) => {
              return (
                <li key={idx} className={tableStyles.tr}></li>
              );
            })}
          </ul>
        </div>
      </div>
      <Page tableRow={row} contentsLength={membersLength} />
    </div>
  );
};

export default Management;