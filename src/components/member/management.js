import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import changeQuery from '../../hooks/change_query';
import getDisplayTime from '../../hooks/get_display_time';
import { isRowInsufficient, makeEmptyArray } from '../../hooks/maintain_table_layout';
import useInput from '../../hooks/use_input';
import buttonStyles from '../../styles/layout/button.module.css';
import tableStyles from '../../styles/layout/table.module.css';
import styles from '../../styles/member/management.module.css';
import Page from '../page';
import Search from '../search';

const Management = () => {
  const router = useRouter();
  const { members, membersLength } = useSelector((state) => state.members);
  const { page, row } = useSelector((state) => state.page);

  // 선택한 데이터 (역할, 상태)
  const [selectRole, changeSelectRole] = useInput('');
  const [selectStatus, changeSelectStatus] = useInput('');

  /** role 변경 요청 */
  const changeRoleHandler = useCallback((id, role) => () => {
    if (role === '일반' && confirm('회원에게 관리자 권한을 허용 하시겠습니까?\n변경 전 정보를 꼼꼼히 확인해주세요.')) {
      // feature
      alert('현재 지원하지 않는 기능입니다.');
    } else if (role === '관리자' && confirm('회원의 관리자 권한을 허용하지 않으시겠습니까?\n변경 전 정보를 꼼꼼히 확인해주세요.')) {
      // feature
      alert('현재 지원하지 않는 기능입니다.');
    }
  }, []);

  /** 원하는 페이지로 이동*/
  const moveToOtherPageHandler = useCallback((url) => () => {
    router.push(url);
  }, []);

  useEffect(() => {
    const newQuery = changeQuery(router.query, { role: selectRole, status: selectStatus });
    router.push({ pathname: router.pathname, query: newQuery });
  }, [selectRole, selectStatus]);

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
              <div className={styles.email}>email</div>
              <div className={styles.type}>
                <select value={selectRole} onChange={changeSelectRole}>
                  <option value=''>역할</option>
                  <option value='일반'>일반</option>
                  <option value='관리자'>관리자</option>
                </select>
              </div>
              <div className={styles.status}>
                <select value={selectStatus} onChange={changeSelectStatus}>
                  <option value=''>상태</option>
                  <option value='activated'>activated</option>
                  <option value='deactivated'>deactivated</option>
                  <option value='sleep'>sleep</option>
                </select>
              </div>
              <div className={styles.createdDate}>가입일</div>
              <div className={styles.accessedDate}>접속일</div>
              <div className={styles.button}></div>
              <div className={styles.button}></div>
            </div>
          </div>
          <ul>
            {members && members.map((member) => {
              return (
                <li key={member.id} className={tableStyles.tr}>
                  <div className={styles.id}>{member.id && member.id}</div>
                  <div className={styles.nickname}>{member.nickname && member.nickname}</div>
                  <div className={styles.email}>{member.email && member.email}</div>
                  <div className={styles.type}>{member.type && member.type}</div>
                  <div className={styles.status}>{member.status && member.status}</div>
                  <div className={styles.createdDate}>{member.createdDate && getDisplayTime(member.createdDate, 'yyyy-mm-dd hh:mm')}</div>
                  <div className={styles.accessedDate}>{member.accessedDate && getDisplayTime(member.accessedDate, 'yyyy-mm-dd hh:mm')}</div>
                  <div className={styles.button}><button className={buttonStyles.status} onClick={changeRoleHandler(member.id, member.type)}>역할전환</button></div>
                  <div className={styles.button}><button className={buttonStyles.details} onClick={moveToOtherPageHandler(`/member/${member.id}`)}>상세정보</button></div>
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