import { nanoid } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import SectionSearchHeader from '@components/common/header/section_search';
import Modal from '@components/common/modal';
import ManagementTable from '@components/common/table/management';
import ManagementTableBody from '@components/common/table/management/body';
import ManagementTableHead from '@components/common/table/management/head';
import ManagementTableRow from '@components/common/table/management/row';
import MemberDetails from '@components/member/management/details';
import changeQuery from '@hooks/change_query';
import { useInputSelect } from '@hooks/use_input';
import { RootState } from '@redux/reducers';
import styles from '@styles/components/member/management.module.scss';
import buttonStyles from '@styles/layout/button.module.scss';
import { MemberRole, MemberRoleArr, MemberStatus, MemberStatusArr } from '@types';
import getDisplayTime from '@utils/get_display_time';

const MemberManagement = () => {
  const router = useRouter();
  const { members, membersLength } = useSelector((state: RootState) => state.member);

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

  if (!members) return;
  return (
    <section className={styles.container}>
      <SectionSearchHeader
        title='회원 관리'
        search='닉네임' />
      <ManagementTable
        head={
          <ManagementTableHead>
            <span className={styles.id}>번호</span>
            <span className={styles.nickname}>닉네임</span>
            <span className={styles.email}>접속 이메일</span>
            <span className={styles.role}>
              <select value={selectRole} onChange={changeSelectRole}>
                <option value=''>역할</option>
                {MemberRoleArr.map((value) =>
                  <option key={nanoid()} value={value}>{value}</option>
                )}
              </select>
            </span>
            <span className={styles.status}>
              <select value={selectStatus} onChange={changeSelectStatus}>
                <option value=''>이용상태</option>
                {MemberStatusArr.map((value) =>
                  <option key={nanoid()} value={value}>{value}</option>
                )}
              </select>
            </span>
            <span className={styles.createdDate}>가입일</span>
            <span className={styles.accessedDate}>접속일</span>
            <span className={styles.button} />
          </ManagementTableHead>
        }
        body={
          <ManagementTableBody contentsLength={membersLength}>
            {members && members.map((member) => {
              return (
                <ManagementTableRow key={member.id} checked={false}>
                  <span className={styles.id}>{member.id && member.id}</span>
                  <span className={styles.nickname}>{member.nickname && member.nickname}</span>
                  <span className={styles.email}>{member.email && member.email}</span>
                  <span className={styles.role}>{member.role && member.role}</span>
                  <span className={styles.status}>{member.status && member.status}</span>
                  <span className={styles.createdDate}>{member.createdDate && getDisplayTime(member.createdDate, 'yyyy-mm-dd hh:mm')}</span>
                  <span className={styles.accessedDate}>{member.accessedDate && getDisplayTime(member.accessedDate, 'yyyy-mm-dd hh:mm')}</span>
                  <span className={styles.button}>
                    <button className={buttonStyles.table_details_btn} onClick={detailsBtnHandler(member.id)}>상세정보</button>
                    <Modal id={member.id} openModalId={openModalId} setOpenModalId={setOpenModalId}>
                      <MemberDetails member={member} setOpenModalId={setOpenModalId} />
                    </Modal>
                  </span>
                </ManagementTableRow>
              );
            })}
          </ManagementTableBody>
        }
        contentsLength={membersLength}
      />
    </section>
  );
};

export default MemberManagement;