import { nanoid } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from '@components/common/modal';
import Page from '@components/common/page';
import Search from '@components/common/search';
import Details from '@components/feedback/details';
import changeQuery from '@hooks/change_query';
import getDisplayTime from '@hooks/get_display_time';
import { isRowInsufficient, makeEmptyArray } from '@hooks/maintain_table_layout';
import { useInputSelect } from '@hooks/use_input';
import { RootState } from '@redux/reducers';
import styles from '@styles/components/feedback/management.module.scss';
import buttonStyles from '@styles/layout/button.module.scss';
import tableStyles from '@styles/layout/table.module.scss';
import { FeedbackCategory, FeedbackCategoryArr } from '@types';

const Management = () => {
  const router = useRouter();
  const { feedbacks, feedbacksLength } = useSelector((state: RootState) => state.feedback);
  const { page, row } = useSelector((state: RootState) => state.page);

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

  return (
    <>
      {feedbacks &&
        <section className={styles.container}>
          <div className={styles.header}>
            <h2>피드백 관리</h2>
            <Search search='피드백 내용' />
          </div>
          <div className={styles.contents}>
            <div className={tableStyles.table}>
              <div className={tableStyles.thead}>
                <div className={tableStyles.tr}>
                  <div className={styles.id}>번호</div>
                  <div className={styles.content}>내용</div>
                  <div className={styles.email}>이메일</div>
                  <div className={styles.category}>
                    <select value={selectCategory} onChange={changeSelectCategory}>
                      <option value=''>유형분류</option>
                      {FeedbackCategoryArr.map((value) =>
                        <option key={nanoid()} value={value}>{value}</option>
                      )}
                    </select>
                  </div>
                  <div className={styles.device}>디바이스 유형</div>
                  <div className={styles.feedbackCount}>별점 평가</div>
                  <div className={styles.createdDate}>등록일자</div>
                  <div className={styles.button}></div>
                </div>
              </div>
              <ul className={tableStyles.tbody}>
                {feedbacks && feedbacks.map((feedback) => {
                  return (
                    <li key={feedback.id} className={tableStyles.tr}>
                      <div className={styles.id}>{feedback.id && feedback.id}</div>
                      <div className={styles.content}>{feedback.content && feedback.content}</div>
                      <div className={styles.email}>{feedback.email && feedback.email}</div>
                      <div className={styles.category}>{feedback.category && feedback.category}</div>
                      <div className={styles.device}>{feedback.deviceOS && feedback.deviceOS}</div>
                      <div className={styles.feedbackCount}>{feedback.score && feedback.score}</div>
                      <div className={styles.createdDate}>{feedback.createdDate && getDisplayTime(feedback.createdDate, 'yyyy-mm-dd hh:mm')}</div>
                      <div className={styles.button}>
                        <button className={buttonStyles.table_details_btn} onClick={detailsBtnHandler(feedback.id)}>상세정보</button>
                        <Modal id={feedback.id} openModalId={openModalId} setOpenModalId={setOpenModalId}>
                          <Details feedback={feedback} setOpenModalId={setOpenModalId} />
                        </Modal>
                      </div>
                    </li>
                  );
                })}
                {feedbacksLength && isRowInsufficient(page, row, feedbacksLength) && makeEmptyArray(page, row, feedbacksLength).map((feedback, idx) => {
                  return (
                    <li key={idx} className={tableStyles.tr}></li>
                  );
                })}
              </ul>
            </div>
          </div>
          {feedbacksLength ? <Page contentsLength={feedbacksLength} /> : null}
        </section>
      }
    </>
  );
};

export default Management;