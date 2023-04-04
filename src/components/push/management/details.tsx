import Image from 'next/image';
import React, { useCallback } from 'react';

import closeButton from '@images/close_icon.svg';
import buttonStyles from '@styles/layout/button.module.scss';
import styles from '@styles/layout/modal/details.module.scss';
import { PushDTO } from '@types';
import getDisplayTime from '@utils/get_display_time';

type PropsType = {
  push: PushDTO;
  setOpenModalId: React.Dispatch<React.SetStateAction<number | null>>;
};

const PushDetails = ({ push, setOpenModalId }: PropsType) => {
  /** 닫기 버튼 - 모달창 닫기 */
  const closeBtnHandler = useCallback(() => {
    setOpenModalId(null);
  }, []);

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
      <button className={styles.close} onClick={closeBtnHandler}>
        <Image src={closeButton} alt='close button' width={32} height={32} />
      </button>
      <h3>푸시 상세 정보</h3>
      <div className={styles.contents}>
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
        <div className={styles.content}>
          <div className={styles.key}>제목</div>
          <div className={styles.value}>{push?.title ? push.title : null}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.key}>내용</div>
          <div className={styles.value}>{push?.content ? push.content : null}</div>
        </div>
      </div>
      <div className={buttonStyles.modal_buttons}>
        <button className={buttonStyles.modal_close_btn} onClick={closeBtnHandler}>닫기</button>
        <button className={buttonStyles.modal_apply_btn} onClick={submitBtnHandler}>적용</button>
        <button className={buttonStyles.modal_send_btn} onClick={sendBtnHandler}>{push?.status === '전송전' ? '전송' : '재전송'}</button>
      </div>
    </section>
  );
};

export default PushDetails;