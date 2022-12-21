import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import changeQuery from '../../hooks/change_query';
import getDisplayTime from '../../hooks/get_display_time';
import { isRowInsufficient, makeEmptyArray } from '../../hooks/maintain_table_layout';
import useInput from '../../hooks/use_input';
import styles from '../../styles/feedback/management.module.css';
import tableStyles from '../../styles/layout/table.module.css';
import Modal from '../modal';
import Page from '../page';
import Search from '../search';
import Details from './details';

const Management = () => {
  const router = useRouter();
  const { feedbacks, feedbacksLength } = useSelector((state) => state.feedbacks);
  const { page, row } = useSelector((state) => state.page);

  // 선택한 데이터 (유형분류)
  const [selectCategory, changeSelectCategory] = useInput('');

  // 열려있는 모달창 식별자 상태
  const [openModalId, setOpenModalId] = useState(null);

  /** 모달창 열기 */
  const openModal = useCallback((id) => () => {
    setOpenModalId(id);
  }, []);

  useEffect(() => {
    const newQuery = changeQuery(router.query, { category: selectCategory });
    router.push({ pathname: router.pathname, query: newQuery });
  }, [selectCategory]);

  return (
    <div className={styles.container}>
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
              <div className={styles.type}>
                <select value={selectCategory} onChange={changeSelectCategory}>
                  <option value=''>유형분류</option>
                  <option value='정보누락'>정보누락</option>
                  <option value='업데이트'>업데이트</option>
                  <option value='로그인'>로그인</option>
                  <option value='보안'>보안</option>
                  <option value='PUSH'>PUSH</option>
                  <option value='UI/UX 개선'>UI/UX 개선</option>
                  <option value='에러'>에러</option>
                  <option value='기타'>기타</option>
                </select>
              </div>
              <div className={styles.device}>디바이스 유형</div>
              <div className={styles.feedbackCount}>피드백 횟수</div>
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
                  <div className={styles.type}>{feedback.type && feedback.type}</div>
                  <div className={styles.device}>{feedback.device && feedback.device}</div>
                  <div className={styles.feedbackCount}>{feedback.feedbackCount && feedback.feedbackCount}</div>
                  <div className={styles.createdDate}>{feedback.createdDate && getDisplayTime(feedback.createdDate, 'yyyy-mm-dd hh:mm')}</div>
                  <div className={styles.button}>
                    <button onClick={openModal(feedback.id)}>상세정보</button>
                    <Modal id={feedback.id} openModalId={openModalId} setOpenModalId={setOpenModalId}>
                      <Details feedback={feedback} setOpenModalId={setOpenModalId} />
                    </Modal>
                  </div>
                </li>
              );
            })}
            {isRowInsufficient(page, row, feedbacksLength) && makeEmptyArray(page, row, feedbacksLength).map((feedback, idx) => {
              return (
                <li key={idx} className={tableStyles.tr}></li>
              );
            })}
          </ul>
        </div>
      </div>
      <Page tableRow={row} contentsLength={feedbacksLength} />
    </div>
  );
};

export default Management;