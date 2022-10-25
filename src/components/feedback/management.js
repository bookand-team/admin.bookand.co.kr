import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import changeQuery from '../../hooks/change_query';
import getDisplayTime from '../../hooks/get_display_time';
import { isRowInsufficient, makeEmptyArray } from '../../hooks/maintain_table_layout';
import useInput from '../../hooks/use_input';
import styles from '../../styles/feedback/management.module.css';
import tableStyles from '../../styles/layout/table.module.css';
import Page from '../page';
import Search from '../search';

const Management = () => {
  const router = useRouter();
  const { feedbacks, feedbacksLength } = useSelector((state) => state.feedbacks);
  const { page, row } = useSelector((state) => state.page);

  // category 선택
  const [selectCategory, changeSelectCategory] = useInput('');
  useEffect(() => {
    const newQuery = changeQuery(router, { category: selectCategory });
    router.push(`${router.pathname}${newQuery}`);
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
              <div className={styles.email}>이메일</div>
              <div className={styles.content}>내용</div>
              <div className={styles.device}>디바이스 유형</div>
              <div className={styles.feedbackCount}>피드백 횟수</div>
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
              <div className={styles.createdDate}>등록일자</div>
            </div>
          </div>
          <ul>
            {feedbacks && feedbacks.map((report) => {
              return (
                <li key={report.id} className={tableStyles.tr}>
                  <div className={styles.id}>{report.id && report.id}</div>
                  <div className={styles.email}>{report.email && report.email}</div>
                  <div className={styles.content}>{report.content && report.content}</div>
                  <div className={styles.device}>{report.device && report.device}</div>
                  <div className={styles.feedbackCount}>{report.feedbackCount && report.feedbackCount}</div>
                  <div className={styles.type}>{report.type && report.type}</div>
                  <div className={styles.createdDate}>{report.createdDate && getDisplayTime(report.createdDate, 'yyyy-mm-dd hh:mm')}</div>
                </li>
              );
            })}
            {isRowInsufficient(page, row, feedbacksLength) && makeEmptyArray(page, row, feedbacksLength).map((report, idx) => {
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