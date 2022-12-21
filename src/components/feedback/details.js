import Image from 'next/image';
import { useCallback } from 'react';

import closeButton from '../../images/close_icon.svg';
import styles from '../../styles/layout/modal/details.module.css';

const Details = ({ feedback, setOpenModalId }) => {
  /** 닫기 버튼 */
  const closeBtnHandler = useCallback(() => {
    setOpenModalId(null);
  }, []);

  /** 적용 버튼 */
  const submitBtnHandler = useCallback(() => {
    // TODO: 수정사항 적용 기능
    alert('현재 지원하지 않는 기능입니다.');
  }, []);

  return (
    <div className={styles.container}>
      <button className={styles.close} onClick={closeBtnHandler}>
        <Image src={closeButton} alt='close button' width={32} height={32} />
      </button>
      <h3>피드백 상세 정보</h3>
      <div className={styles.contents}>
        <div className={styles.row}>
          <div className={styles.key}>번호</div>
          <div className={styles.value}>{feedback?.id ? feedback.id : null}</div>
          <div className={styles.key}>등록일자</div>
          <div className={styles.value}>{feedback?.createdDate ? feedback.createdDate : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>이메일</div>
          <div className={styles.value}>{feedback?.email ? feedback.email : null}</div>
          <div className={styles.key}>피드백 횟수</div>
          <div className={styles.value}>{feedback?.feedbackCount ? feedback.feedbackCount : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>디바이스</div>
          <div className={styles.value}>{feedback?.device ? feedback.device : null}</div>
          <div className={styles.key}>유형 분류</div>
          <div className={styles.value}>{feedback?.type ? feedback.type : null}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.key}>내용</div>
          <div className={styles.value}>{feedback?.content ? feedback.content : null}</div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.close_btn} onClick={closeBtnHandler}>닫기</button>
        <button className={styles.apply_btn} onClick={submitBtnHandler}>적용</button>
      </div>
    </div>
  );
};

export default Details;