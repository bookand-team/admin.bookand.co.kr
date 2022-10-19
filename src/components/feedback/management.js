import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import styles from '../../styles/feedback/management.module.css';
import tableStyles from '../../styles/layout/table.module.css';
import Page from '../page';

const Management = () => {
  const { feedbacks, feedbacksLength } = useSelector(state => state.feedbacks);

  const tableRows = 10;
  const emptyArray = useCallback(() => {
    const ret = [];
    for (var i = 0; i < tableRows - feedbacksLength; i++) {
      ret.push(null);
    }
    return ret;
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>피드백 관리</h2>
        <div className={styles.search}>
          <div>
            <div>피드백 내용</div>
            <input />
          </div>
          <button>검색</button>
        </div>
      </div>
      <div className={styles.contents}>
        <div className={tableStyles.table}>
          <div className={tableStyles.thead}>
            <div className={tableStyles.tr}>
              <div className={styles.id}>번호</div>
              <div className={styles.email}>이메일</div>
              <div className={styles.content}>내용</div>
              <div className={styles.device}>디바이스 유형</div>
              <div className={styles.feedbackNumber}>피드백 누적횟수</div>
              <div className={styles.type}>유형분류</div>
              <div className={styles.createdDate}>등록일자</div>
            </div>
          </div>
          <ul>
            {feedbacks.map((report) => {
              return (
                <li key={report.id} className={tableStyles.tr}>
                  <div className={styles.id}>{report.id && report.id}</div>
                  <div className={styles.email}>{report.email && report.email}</div>
                  <div className={styles.content}>{report.content && report.content}</div>
                  <div className={styles.device}>{report.device && report.device}</div>
                  <div className={styles.feedbackNumber}>{report.feedbackNumber && report.feedbackNumber}</div>
                  <div className={styles.type}>{report.type && report.type}</div>
                  <div className={styles.createdDate}>{report.createdDate && report.createdDate}</div>
                </li>
              );
            })}
            {feedbacksLength !== tableRows && emptyArray().map((report, idx) => {
              return (
                <li key={idx} className={tableStyles.tr}></li>
              );
            })}
          </ul>
        </div>
      </div>
      <Page />
    </div>
  );
};

export default Management;