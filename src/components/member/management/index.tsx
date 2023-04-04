import { nanoid } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import SectionSearchHeader from '@components/common/header/section_search';
import Modal from '@components/common/modal';
import ResponsivePageNavbar from '@components/common/page_navbar';
import MemberDetails from '@components/member/management/details';
import changeQuery from '@hooks/change_query';
import { isRowInsufficient, makeEmptyArray } from '@hooks/maintain_table_layout';
import { useInputSelect } from '@hooks/use_input';
import { RootState } from '@redux/reducers';
import styles from '@styles/components/member/management.module.scss';
import buttonStyles from '@styles/layout/button.module.scss';
import tableStyles from '@styles/layout/table.module.scss';
import { MemberRole, MemberRoleArr, MemberStatus, MemberStatusArr } from '@types';
import getDisplayTime from '@utils/get_display_time';

const MemberManagement = () => {
  const router = useRouter();
  const { members, membersLength } = useSelector((state: RootState) => state.member);
  const { page, row } = useSelector((state: RootState) => state.page);

  // 선택한 데이터 (역할, 상태)
  const [selectRole, changeSelectRole] = useInputSelect<'' | MemberRole>('');
  const [selectStatus, changeSelectStatus] = useInputSelect<'' | MemberStatus>('');

  // 열려있는 모달창 식별자 상태
  const [openModalId, setOpenModalId] = useState<number | null>(null);

  /** 상세정보 버튼 - 모달창 열기 */
  const detailsBtnHandler = useCallback((id: number) => () => {
    setOpenModalId(id);
  }, []);

  useEffect(() => {
    const newQuery = changeQuery(router.query, { role: selectRole, status: selectStatus });
    router.push({ pathname: router.pathname, query: newQuery });
  }, [selectRole, selectStatus]);

  return (
    <>
      {members &&
        <section className={styles.container}>
          <SectionSearchHeader
            title='회원 관리'
            search='닉네임' />
          <div className={styles.contents}>
            <div className={tableStyles.table}>
              <div className={tableStyles.thead}>
                <div className={tableStyles.tr}>
                  <div className={styles.id}>번호</div>
                  <div className={styles.nickname}>닉네임</div>
                  <div className={styles.email}>접속 이메일</div>
                  <div className={styles.role}>
                    <select value={selectRole} onChange={changeSelectRole}>
                      <option value=''>역할</option>
                      {MemberRoleArr.map((value) =>
                        <option key={nanoid()} value={value}>{value}</option>
                      )}
                    </select>
                  </div>
                  <div className={styles.status}>
                    <select value={selectStatus} onChange={changeSelectStatus}>
                      <option value=''>이용상태</option>
                      {MemberStatusArr.map((value) =>
                        <option key={nanoid()} value={value}>{value}</option>
                      )}
                    </select>
                  </div>
                  <div className={styles.createdDate}>가입일</div>
                  <div className={styles.accessedDate}>접속일</div>
                  <div className={styles.button}></div>
                </div>
              </div>
              <ul className={tableStyles.tbody}>
                {members && members.map((member) => {
                  return (
                    <li key={member.id} className={tableStyles.tr}>
                      <div className={styles.id}>{member.id && member.id}</div>
                      <div className={styles.nickname}>{member.nickname && member.nickname}</div>
                      <div className={styles.email}>{member.email && member.email}</div>
                      <div className={styles.role}>{member.role && member.role}</div>
                      <div className={styles.status}>{member.status && member.status}</div>
                      <div className={styles.createdDate}>{member.createdDate && getDisplayTime(member.createdDate, 'yyyy-mm-dd hh:mm')}</div>
                      <div className={styles.accessedDate}>{member.accessedDate && getDisplayTime(member.accessedDate, 'yyyy-mm-dd hh:mm')}</div>
                      <div className={styles.button}>
                        <button className={buttonStyles.table_details_btn} onClick={detailsBtnHandler(member.id)}>상세정보</button>
                        <Modal id={member.id} openModalId={openModalId} setOpenModalId={setOpenModalId}>
                          <MemberDetails member={member} setOpenModalId={setOpenModalId} />
                        </Modal>
                      </div>
                    </li>
                  );
                })}
                {membersLength && isRowInsufficient(page, row, membersLength) && makeEmptyArray(page, row, membersLength).map((member, idx) => {
                  return (
                    <li key={idx} className={tableStyles.tr}></li>
                  );
                })}
              </ul>
            </div>
          </div>
          {membersLength ? <ResponsivePageNavbar contentsLength={membersLength} /> : null}
        </section>
      }
    </>
  );
};

export default MemberManagement;