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
import FeedbackDetails from '@components/feedback/management/details';
import changeQuery from '@hooks/change_query';
import { useInputSelect } from '@hooks/use_input';
import { RootState } from '@redux/reducers';
import styles from '@styles/components/feedback/management.module.scss';
import buttonStyles from '@styles/layout/button.module.scss';
import { FeedbackCategory, FeedbackCategoryArr } from '@types';
import getDisplayTime from '@utils/get_display_time';

const FeedbackManagement = () => {
  const router = useRouter();
  const { feedbacks, feedbacksLength } = useSelector((state: RootState) => state.feedback);

  // 선택한 데이터 (유형분류)
  const [selectCategory, changeSelectCategory] = useInputSelect<'' | FeedbackCategory>('');

  // 열려있는 모달창 식별자 상태
  const [openModalId, setOpenModalId] = useState<number | null>(null);

  /** 상세정보 버튼 - 모달창 열기 */
  const detailsBtnHandler = useCallback((id: number) => () => {
    setOpenModalId(id);
  }, []);

  useEffect(() => {
    const newQuery = changeQuery(router.query, { category: selectCategory });
    router.push({ pathname: router.pathname, query: newQuery });
  }, [selectCategory]);

  if (!feedbacks) return;
  return (
    <section className={styles.container}>
      <SectionSearchHeader
        title='피드백 관리'
        search='피드백 내용' />
      <ManagementTable
        head={
          <ManagementTableHead>
            <span className={styles.id}>번호</span>
            <span className={styles.content}>내용</span>
            <span className={styles.email}>이메일</span>
            <span className={styles.category}>
              <select value={selectCategory} onChange={changeSelectCategory}>
                <option value=''>유형분류</option>
                {FeedbackCategoryArr.map((value) =>
                  <option key={nanoid()} value={value}>{value}</option>
                )}
              </select>
            </span>
            <span className={styles.device}>디바이스</span>
            <span className={styles.feedbackCount}>별점 평가</span>
            <span className={styles.createdDate}>등록일자</span>
            <span className={styles.button} />
          </ManagementTableHead>
        }
        body={
          <ManagementTableBody contentsLength={feedbacksLength}>
            {feedbacks && feedbacks.map((feedback) => {
              return (
                <ManagementTableRow key={feedback.id} checked={false}>
                  <span className={styles.id}>{feedback.id && feedback.id}</span>
                  <span className={styles.content}>{feedback.content && feedback.content}</span>
                  <span className={styles.email}>{feedback.email && feedback.email}</span>
                  <span className={styles.category}>{feedback.category && feedback.category}</span>
                  <span className={styles.device}>{feedback.deviceOS && feedback.deviceOS}</span>
                  <span className={styles.feedbackCount}>{feedback.score && feedback.score}</span>
                  <span className={styles.createdDate}>{feedback.createdDate && getDisplayTime(feedback.createdDate, 'yyyy-mm-dd hh:mm')}</span>
                  <span className={styles.button}>
                    <button className={buttonStyles.table_details_btn} onClick={detailsBtnHandler(feedback.id)}>상세정보</button>
                    <Modal id={feedback.id} openModalId={openModalId} setOpenModalId={setOpenModalId}>
                      <FeedbackDetails feedback={feedback} setOpenModalId={setOpenModalId} />
                    </Modal>
                  </span>
                </ManagementTableRow>
              );
            })}
          </ManagementTableBody>
        }
        contentsLength={feedbacksLength}
      />
    </section>
  );
};

export default FeedbackManagement;