import { nanoid } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import SectionSearchHeader from '@components/common/header/section_search';
import Modal from '@components/common/modal';
import ResponsivePageNavbar from '@components/common/page_navbar';
import ReportDetails from '@components/report/management/details';
import changeQuery from '@hooks/change_query';
import { isRowInsufficient, makeEmptyArray } from '@hooks/maintain_table_layout';
import { useInputSelect } from '@hooks/use_input';
import { RootState } from '@redux/reducers';
import styles from '@styles/components/report/management.module.scss';
import buttonStyles from '@styles/layout/button.module.scss';
import tableStyles from '@styles/layout/table.module.scss';
import { ReportStatus, ReportStatusArr } from '@types';
import getDisplayTime from '@utils/get_display_time';

const ReportManagement = () => {
  const router = useRouter();
  const { reports, reportsLength } = useSelector((state: RootState) => state.report);
  const { page, row } = useSelector((state: RootState) => state.page);

  // 선택한 데이터 (노출상태)
  const [selectStatus, changeSelectStatus] = useInputSelect<'' | ReportStatus>('');

  // 열려있는 모달창 식별자 상태
  const [openModalId, setOpenModalId] = useState<number | null>(null);

  /** 상세정보 버튼 - 모달창 열기 */
  const detailsBtnHandler = useCallback((id: number) => () => {
    setOpenModalId(id);
  }, []);

  useEffect(() => {
    const newQuery = changeQuery(router.query, { status: selectStatus });
    router.push({ pathname: router.pathname, query: newQuery });
  }, [selectStatus]);

  return (
    <>
      {reports &&
        <section className={styles.container}>
          <SectionSearchHeader
            title='서점제보 관리'
            search='서점명' />
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
                      {ReportStatusArr.map((value) => <option key={nanoid()} value={value}>{value}</option>)}
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
                          <ReportDetails report={report} setOpenModalId={setOpenModalId} />
                        </Modal>
                      </div>
                    </li>
                  );
                })}
                {reportsLength && isRowInsufficient(page, row, reportsLength) && makeEmptyArray(page, row, reportsLength).map((report, idx) => {
                  return (
                    <li key={idx} className={tableStyles.tr}></li>
                  );
                })}
              </ul>
            </div>
          </div>
          {reportsLength ? <ResponsivePageNavbar contentsLength={reportsLength} /> : null}
        </section>
      }
    </>
  );
};

export default ReportManagement;