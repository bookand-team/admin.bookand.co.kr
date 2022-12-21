import Image from 'next/image';
import { useCallback } from 'react';

import closeButton from '../../images/close_icon.svg';
import styles from '../../styles/layout/modal/details.module.css';

const Details = ({ bookstore, setOpenModalId }) => {
  /** 닫기 버튼 */
  const closeBtnHandler = useCallback(() => {
    setOpenModalId(null);
  }, []);

  /** 수정사항 적용 버튼 */
  const submitBtnHandler = useCallback(() => {
    // TODO: 수정사항 적용 기능
    alert('현재 지원하지 않는 기능입니다.');
  }, []);

  return (
    <div className={styles.container}>
      <button className={styles.close} onClick={closeBtnHandler}>
        <Image src={closeButton} alt='close button' width={32} height={32} />
      </button>
      <h3>서점 상세 정보</h3>
      <div className={styles.contents}>
        <div className={styles.row}>
          <div className={styles.key}>번호</div>
          <div className={styles.value}>{bookstore?.id ? bookstore.id : null}</div>
          <div className={styles.key}>북마크 수</div>
          <div className={styles.value}>{bookstore?.bookmarkArticle ? bookstore.bookmarkArticle : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>서점명</div>
          <div className={styles.value}>{bookstore?.name ? bookstore.name : null}</div>
          <div className={styles.key}>누적 조회수</div>
          <div className={styles.value}>{bookstore?.view ? bookstore.view : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>테마</div>
          <div className={styles.value}>{bookstore?.theme ? bookstore.theme : null}</div>
          <div className={styles.key}>등록일자</div>
          <div className={styles.value}>{bookstore?.createdDate ? bookstore.createdDate : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>노출 상태</div>
          <div className={styles.value}>{bookstore?.status ? bookstore.status : null}</div>
          <div className={styles.key}>노출 일자</div>
          <div className={styles.value}>{bookstore?.exposedDate ? bookstore.exposedDate : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>연락처</div>
          <div className={styles.value}>{bookstore?.contact ? bookstore.contact : null}</div>
          <div className={styles.key}>최종 수정일자</div>
          <div className={styles.value}>{bookstore?.modifiedDate ? bookstore.modifiedDate : null}</div>
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