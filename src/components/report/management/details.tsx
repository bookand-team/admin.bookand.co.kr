import Image from 'next/image';
import { useCallback } from 'react';

import closeButton from '@images/close_icon.svg';
import styles from '@styles/components/common/modal/details.module.scss';
import { ReportDTO } from '@types';
import getDisplayTime from '@utils/get_display_time';

type PropsType = {
  report: ReportDTO;
  closeModal: () => void;
};

const ReportDetails = ({ report, closeModal }: PropsType) => {
  /** 적용 버튼 - 수정사항 저장 요청 */
  const submitBtnHandler = useCallback(() => {
    // TODO: 수정사항 저장 요청 기능
    alert('현재 지원하지 않는 기능입니다.');
  }, []);

  return (
    <section className={styles.container}>
      <button className={styles.close} onClick={closeModal}>
        <Image src={closeButton} alt='close button' width={32} height={32} />
      </button>
      <h3>서점제보 상세 정보</h3>
      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.key}>번호</div>
          <div className={styles.value}>{report?.id ? report.id : null}</div>
          <div className={styles.key}>이메일</div>
          <div className={styles.value}>{report?.email ? report.email : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>서점명</div>
          <div className={styles.value}>{report?.bookstoreName ? report.bookstoreName : null}</div>
          <div className={styles.key}>제보요청 수</div>
          <div className={styles.value}>{report?.reportedCount ? report.reportedCount : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>노출 상태</div>
          <div className={styles.value}>{report?.status ? report.status : null}</div>
          <div className={styles.key}>등록일자</div>
          <div className={styles.value}>{report?.createdDate ? getDisplayTime(report.createdDate, 'yyyy-mm-dd hh:mm') : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>노출일자</div>
          <div className={styles.value}>{report?.exposedDate ? getDisplayTime(report.exposedDate, 'yyyy-mm-dd hh:mm') : null}</div>
          <div className={styles.key}></div>
          <div className={styles.value}></div>
        </div>
      </div>
      <nav className={styles.buttons}>
        <button className={styles.close_btn} onClick={closeModal}>닫기</button>
        <button className={styles.apply_btn} onClick={submitBtnHandler}>적용</button>
      </nav>
    </section>
  );
};

export default ReportDetails;