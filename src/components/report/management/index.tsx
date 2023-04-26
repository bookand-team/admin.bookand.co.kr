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
import ReportDetails from '@components/report/management/details';
import changeQuery from '@hooks/change_query';
import { useInputSelect } from '@hooks/use_input';
import { RootState } from '@redux/reducers';
import styles from '@styles/components/report/management.module.scss';
import { ReportStatus, ReportStatusArr } from '@types';
import getDisplayTime from '@utils/get_display_time';

const ReportManagement = () => {
  const router = useRouter();
  const { reports, reportsLength } = useSelector((state: RootState) => state.report);

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

  if (!reports) return <></>;
  return (
    <section className={styles.container}>
      <SectionSearchHeader
        title='서점제보 관리'
        search='서점명' />
      <ManagementTable
        head={
          <ManagementTableHead>
            <span className={styles.id}>번호</span>
            <span className={styles.bookstoreName}>서점명</span>
            <span className={styles.email}>이메일</span>
            <span className={styles.status}>
              <select value={selectStatus} onChange={changeSelectStatus}>
                <option value=''>노출상태</option>
                {ReportStatusArr.map((value) => <option key={nanoid()} value={value}>{value}</option>)}
              </select>
            </span>
            <span className={styles.reportedCount}>제보요청 수</span>
            <span className={styles.createdDate}>등록일자</span>
            <span className={styles.exposedDate}>노출일자</span>
            <span className={styles.button}></span>
          </ManagementTableHead>
        }
        body={
          <ManagementTableBody contentsLength={reportsLength}>
            {reports && reports.map((report) => {
              return (
                <ManagementTableRow key={report.id}>
                  <span className={styles.id}>{report.id && report.id}</span>
                  <span className={styles.bookstoreName}>{report.bookstoreName && report.bookstoreName}</span>
                  <span className={styles.email}>{report.email && report.email}</span>
                  <span className={styles.status}>{report.status && report.status}</span>
                  <span className={styles.reportedCount}>{report.reportedCount && report.reportedCount}</span>
                  <span className={styles.createdDate}>{report.createdDate && getDisplayTime(report.createdDate, 'yyyy-mm-dd hh:mm')}</span>
                  <span className={styles.exposedDate}>{report.exposedDate && getDisplayTime(report.exposedDate, 'yyyy-mm-dd hh:mm')}</span>
                  <span className={styles.button}>
                    <button className={styles.table_details_btn} onClick={detailsBtnHandler(report.id)}>상세정보</button>
                    <Modal id={report.id} openModalId={openModalId} setOpenModalId={setOpenModalId}>
                      <ReportDetails report={report} setOpenModalId={setOpenModalId} />
                    </Modal>
                  </span>
                </ManagementTableRow>
              );
            })}
          </ManagementTableBody>
        }
        contentsLength={reportsLength}
      />
    </section>
  );
};

export default ReportManagement;