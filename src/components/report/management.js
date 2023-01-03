import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import changeQuery from '../../hooks/change_query';
import getDisplayTime from '../../hooks/get_display_time';
import { isRowInsufficient, makeEmptyArray } from '../../hooks/maintain_table_layout';
import useInput from '../../hooks/use_input';
import buttonStyles from '../../styles/layout/button.module.css';
import tableStyles from '../../styles/layout/table.module.css';
import styles from '../../styles/report/management.module.css';
import Modal from '../modal';
import Page from '../page';
import Search from '../search';
import Details from './details';

const Management = () => {
  const router = useRouter();
  const { reports, reportsLength } = useSelector((state) => state.reports);
  const { page, row } = useSelector((state) => state.page);

  // 선택한 데이터 (노출상태)
  const [selectStatus, changeSelectStatus] = useInput('');

  // 열려있는 모달창 식별자 상태
  const [openModalId, setOpenModalId] = useState(null);

  /** 상세정보 버튼 - 모달창 열기 */
  const detailsBtnHandler = useCallback((id) => () => {
    setOpenModalId(id);
  }, []);

  useEffect(() => {
    const newQuery = changeQuery(router.query, { status: selectStatus });
    router.push({ pathname: router.pathname, query: newQuery });
  }, [selectStatus]);

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
              <div className={styles.bookstoreName}>서점명</div>
              <div className={styles.email}>이메일</div>
              <div className={styles.status}>
                <select value={selectStatus} onChange={changeSelectStatus}>
                  <option value=''>노출상태</option>
                  <option value='노출'>노출</option>
                  <option value='미노출'>미노출</option>
                </select>
              </div>
              <div className={styles.reportedCount}>제보요청 수</div>
              <div className={styles.createdDate}>등록일자</div>
              <div className={styles.exposedDate}>노출일자</div>
              <div className={styles.button}></div>
            </div>
          </div>
          <ul className={tableStyles.tbody}>
            {reports && reports.map((report) => {
              return (
                <li key={report.id} className={tableStyles.tr}>
                  <div className={styles.id}>{report.id && report.id}</div>
                  <div className={styles.bookstoreName}>{report.bookstoreName && report.bookstoreName}</div>
                  <div className={styles.email}>{report.email && report.email}</div>
                  <div className={styles.status}>{report.status && report.status}</div>
                  <div className={styles.reportedCount}>{report.reportedCount && report.reportedCount}</div>
                  <div className={styles.createdDate}>{report.createdDate && getDisplayTime(report.createdDate, 'yyyy-mm-dd hh:mm')}</div>
                  <div className={styles.exposedDate}>{report.exposedDate && getDisplayTime(report.exposedDate, 'yyyy-mm-dd hh:mm')}</div>
                  <div className={styles.button}>
                    <button className={buttonStyles.table_details_btn} onClick={detailsBtnHandler(report.id)}>상세정보</button>
                    <Modal id={report.id} openModalId={openModalId} setOpenModalId={setOpenModalId}>
                      <Details report={report} setOpenModalId={setOpenModalId} />
                    </Modal>
                  </div>
                </li>
              );
            })}
            {isRowInsufficient(page, row, reportsLength) && makeEmptyArray(page, row, reportsLength).map((report, idx) => {
              return (
                <li key={idx} className={tableStyles.tr}></li>
              );
            })}
          </ul>
        </div>
      </div>
      <Page tableRow={row} contentsLength={reportsLength} />
    </div>
  );
};

export default Management;