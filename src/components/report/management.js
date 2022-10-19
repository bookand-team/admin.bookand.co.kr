import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import styles from '../../styles/report/management.module.css';
import tableStyles from '../../styles/layout/table.module.css';
import Page from '../page';
import Search from '../search';

const Management = () => {
  const { reports, reportsLength } = useSelector(state => state.reports);

  const tableRows = 10;
  const emptyArray = useCallback(() => {
    const ret = [];
    for (var i = 0; i < tableRows - reportsLength; i++) {
      ret.push(null);
    }
    return ret;
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>서점제보 관리</h2>
        <Search search='서점명' />
      </div>
      <div className={styles.contents}>
        <div className={tableStyles.table}>
          <div className={tableStyles.thead}>
            <div className={tableStyles.tr}>
              <div className={styles.id}>번호</div>
              <div className={styles.email}>이메일</div>
              <div className={styles.bookstoreName}>서점명</div>
              <div className={styles.reportedNumber}>제보요청 수</div>
              <div className={styles.status}>노출상태</div>
              <div className={styles.createdDate}>등록일자</div>
              <div className={styles.exposedDate}>노출일자</div>
            </div>
          </div>
          <ul>
            {reports.map((report) => {
              return (
                <li key={report.id} className={tableStyles.tr}>
                  <div className={styles.id}>{report.id && report.id}</div>
                  <div className={styles.email}>{report.email && report.email}</div>
                  <div className={styles.bookstoreName}>{report.bookstoreName && report.bookstoreName}</div>
                  <div className={styles.reportedNumber}>{report.reportedNumber && report.reportedNumber}</div>
                  <div className={styles.status}>{report.status && report.status}</div>
                  <div className={styles.createdDate}>{report.createdDate && report.createdDate}</div>
                  <div className={styles.exposedDate}>{report.exposedDate && report.exposedDate}</div>
                </li>
              );
            })}
            {reportsLength !== tableRows && emptyArray().map((report, idx) => {
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