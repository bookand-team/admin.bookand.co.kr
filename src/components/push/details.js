import Image from 'next/image';
import { useCallback } from 'react';

import closeButton from '../../images/close_icon.svg';
import styles from '../../styles/layout/modal/details.module.css';

const Details = ({ push, setOpenModalId }) => {
  /** 닫기 버튼 */
  const closeBtnHandler = useCallback(() => {
    setOpenModalId(null);
  }, []);

  /** 적용 버튼 */
  const submitBtnHandler = useCallback(() => {
    // TODO: 수정사항 적용 기능
    alert('현재 지원하지 않는 기능입니다.');
  }, []);

  /** 전송 버튼 */
  const sendBtnHandler = useCallback(() => {
    // TODO: 전송 기능
    alert('현재 지원하지 않는 기능입니다.');
  }, []);

  return (
    <div className={styles.container}>
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
          <div className={styles.value}>{push?.createdDate ? push.createdDate : null}</div>
          <div className={styles.key}>전송날짜</div>
          <div className={styles.value}>{push?.sentDate ? push.sentDate : null}</div>
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
      <div className={styles.buttons}>
        <button className={styles.close_btn} onClick={closeBtnHandler}>닫기</button>
        <button className={styles.apply_btn} onClick={submitBtnHandler}>적용</button>
        <button className={styles.send_btn} onClick={submitBtnHandler}>{push?.status === '전송전' ? '전송' : '재전송'}</button>
      </div>
    </div>
  );
};

export default Details;