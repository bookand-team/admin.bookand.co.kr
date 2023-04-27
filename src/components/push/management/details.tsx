import Image from 'next/image';
import { useCallback } from 'react';

import closeButton from '@images/close_icon.svg';
import styles from '@styles/components/common/modal/details.module.scss';
import { PushDTO } from '@types';
import getDisplayTime from '@utils/get_display_time';

type PropsType = {
  push: PushDTO;
  closeModal: () => void;
};

const PushDetails = ({ push, closeModal }: PropsType) => {
  /** 적용 버튼 - 수정사항 저장 요청 */
  const submitBtnHandler = useCallback(() => {
    // TODO: 수정사항 저장 요청 기능
    alert('현재 지원하지 않는 기능입니다.');
  }, []);

  /** 전송 버튼 - 푸시 메시지 전송 요청 */
  const sendBtnHandler = useCallback(() => {
    // TODO: 푸시 메시지 전송 요청 기능
    alert('현재 지원하지 않는 기능입니다.');
  }, []);

  return (
    <section className={styles.container}>
      <button className={styles.close} onClick={closeModal}>
        <Image src={closeButton} alt='close button' width={32} height={32} />
      </button>
      <h3>푸시 상세 정보</h3>
      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.key}>번호</div>
          <div className={styles.value}>{push?.id ? push.id : null}</div>
          <div className={styles.key}>카테고리</div>
          <div className={styles.value}>{push?.category ? push.category : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>작성자</div>
          <div className={styles.value}>{push?.writer ? push.writer : null}</div>
          <div className={styles.key}>전송상태</div>
          <div className={styles.value}>{push?.status ? push.status : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>등록일자</div>
          <div className={styles.value}>{push?.createdDate ? getDisplayTime(push.createdDate, 'yyyy-mm-dd hh:mm') : null}</div>
          <div className={styles.key}>전송날짜</div>
          <div className={styles.value}>{push?.sentDate ? getDisplayTime(push.sentDate, 'yyyy-mm-dd hh:mm') : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>제목</div>
          <div className={`${styles.value} ${styles.entire}`}>{push?.title ? push.title : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>내용</div>
          <div className={`${styles.value} ${styles.entire}`}>{push?.content ? push.content : null}</div>
        </div>
      </div>
      <nav className={styles.buttons}>
        <button className={styles.close_btn} onClick={closeModal}>닫기</button>
        <button className={styles.apply_btn} onClick={submitBtnHandler}>적용</button>
        <button className={styles.send_btn} onClick={sendBtnHandler}>{push?.status === '전송전' ? '전송' : '재전송'}</button>
      </nav>
    </section>
  );
};

export default PushDetails;