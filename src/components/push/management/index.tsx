import { nanoid } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import SectionHeader from '@components/common/header/section';
import DetailsModal from '@components/common/modal/details';
import ManagementTable from '@components/common/table/management';
import ManagementTableBody from '@components/common/table/management/body';
import ManagementTableHead from '@components/common/table/management/head';
import ManagementTableRow from '@components/common/table/management/row';
import PushDetails from '@components/push/management/details';
import changeQuery from '@hooks/change_query';
import multiCheckBoxHandler from '@hooks/multi_checkbox_handler';
import { useDetailsModal } from '@hooks/use_details_modal';
import { useInputSelect } from '@hooks/use_input';
import { RootState } from '@redux/reducers';
import styles from '@styles/components/push/management.module.scss';
import { PushCategory, PushCategoryArr, PushStatus, PushStatusArr } from '@types';
import getDisplayTime from '@utils/get_display_time';

const PushManagement = () => {
  const router = useRouter();
  const { pushes, pushesLength } = useSelector((state: RootState) => state.push);
  const { page } = useSelector((state: RootState) => state.page);

  // checkbox 선택
  const [checkedBoxIds, checkBoxHandler] = multiCheckBoxHandler(page);

  // 선택한 데이터 (카테고리, 전송상태)
  const [selectCategory, changeSelectCategory] = useInputSelect<'' | PushCategory>('');
  const [selectStatus, changeSelectStatus] = useInputSelect<'' | PushStatus>('');

  // 상세정보 모달창 상태 관리: [열린 모달창 번호, 모달창 열기, 모달창 닫기]
  const [openModalId, openModal, closeModal] = useDetailsModal();

  /** 수정 버튼, 생성 버튼 - 원하는 페이지로 이동 */
  const routePage = useCallback((url: string) => () => {
    router.push(url);
  }, []);

  /** 삭제 버튼 - 선택한 푸시 삭제 요청 */
  const deleteHandler = useCallback(() => {
    // TODO: 선택한 푸시 삭제 요청 기능
    if (checkedBoxIds.length === 0) {
      alert('선택된 PUSH가 존재하지 않습니다.');
    } else {
      const sortedCheckboxes = [...checkedBoxIds];
      if (confirm(`${sortedCheckboxes.sort()}번 PUSH를 삭제 처리하시겠습니까?\n삭제한 PUSH는 저장되지 않습니다.`)) {
        // feature
        alert('현재 지원하지 않는 기능입니다.');
      }
    }
  }, [checkedBoxIds]);

  useEffect(() => {
    const newQuery = changeQuery(router.query, { category: selectCategory, status: selectStatus });
    router.push({ pathname: router.pathname, query: newQuery });
  }, [selectCategory, selectStatus]);

  if (!pushes) return <></>;
  return (
    <section className={styles.container}>
      <SectionHeader title='푸시 관리' />
      <ManagementTable
        head={
          <ManagementTableHead>
            <span className={styles.check}>선택</span>
            <span className={styles.id}>번호</span>
            <span className={styles.title}>제목</span>
            <span className={styles.category}>
              <select value={selectCategory} onChange={changeSelectCategory}>
                <option value=''>카테고리</option>
                {PushCategoryArr.map((value) =>
                  <option key={nanoid()} value={value}>{value}</option>
                )}
              </select>
            </span>
            <span className={styles.status}>
              <select value={selectStatus} onChange={changeSelectStatus}>
                <option value=''>전송상태</option>
                {PushStatusArr.map((value) =>
                  <option key={nanoid()} value={value}>{value}</option>
                )}
              </select>
            </span>
            <span className={styles.createdDate}>등록일자</span>
            <span className={styles.sentDate}>전송날짜</span>
            <span className={styles.button} />
            <span className={styles.button} />
          </ManagementTableHead>
        }
        body={
          <ManagementTableBody>
            {pushes && pushes.map((push) => {
              return (
                <ManagementTableRow key={push.id} checked={checkedBoxIds.includes(push.id)}>
                  <span className={styles.check}>
                    <input type='checkbox' checked={checkedBoxIds.includes(push.id) ? true : false} onChange={(event) => checkBoxHandler(event.target.checked, push.id)} />
                  </span>
                  <span className={styles.id}>{push.id && push.id}</span>
                  <span className={styles.title}>{push.title && push.title}</span>
                  <span className={styles.category}>{push.category && push.category}</span>
                  <span className={styles.status}>{push.status && push.status}</span>
                  <span className={styles.createdDate}>{push.createdDate && getDisplayTime(push.createdDate, 'yyyy-mm-dd hh:mm')}</span>
                  <span className={styles.sentDate}>{push.sentDate && getDisplayTime(push.sentDate, 'yyyy-mm-dd hh:mm')}</span>
                  <span className={styles.button}>
                    <button className={styles.table_details_btn} onClick={openModal(push.id)}>상세정보</button>
                    <DetailsModal id={push.id} openModalId={openModalId} closeModal={closeModal}>
                      <PushDetails push={push} closeModal={closeModal} />
                    </DetailsModal>
                  </span>
                  <span className={styles.button}>
                    <button className={styles.table_modify_btn} onClick={routePage(`/push/${push.id}`)}>수정</button>
                  </span>
                </ManagementTableRow>
              );
            })}
          </ManagementTableBody>

        }
        contentsLength={pushesLength}
      />
      <nav className={styles.buttons}>
        <button className={styles.register_btn} onClick={routePage('/push/registration')}>새 푸시 생성</button>
        <button className={styles.delete_btn} onClick={deleteHandler}>선택 푸시 삭제</button>
      </nav>
    </section>
  );
};

export default PushManagement;