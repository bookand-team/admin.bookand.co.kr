import Image from 'next/image';
import React, { useCallback } from 'react';

import closeButton from '@images/close_icon.svg';
import buttonStyles from '@styles/layout/button.module.scss';
import styles from '@styles/layout/modal/details.module.scss';
import { BookstoreDTO } from '@types';
import getDisplayTime from '@utils/get_display_time';

type PropsType = {
  bookstore: BookstoreDTO;
  setOpenModalId: React.Dispatch<React.SetStateAction<number | null>>;
};

const BookstoreDetails = ({ bookstore, setOpenModalId }: PropsType) => {
  /** 닫기 버튼 - 모달창 닫기 */
  const closeBtnHandler = useCallback(() => {
    setOpenModalId(null);
  }, []);

  /** 적용 버튼 - 수정사항 저장 요청 */
  const submitBtnHandler = useCallback(() => {
    // TODO: 수정사항 저장 요청 기능
    alert('현재 지원하지 않는 기능입니다.');
  }, []);

  return (
    <section className={styles.container}>
      <button className={styles.close} onClick={closeBtnHandler}>
        <Image src={closeButton} alt='close button' width={32} height={32} />
      </button>
      <h3>서점 상세 정보</h3>
      <div className={styles.contents}>
        <div className={styles.row}>
          <div className={styles.key}>번호</div>
          <div className={styles.value}>{bookstore?.id ? bookstore.id : null}</div>
          <div className={styles.key}>북마크 수</div>
          <div className={styles.value}>{bookstore?.bookmark ? bookstore.bookmark : null}</div>
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
          <div className={styles.value}>{bookstore?.createdDate ? getDisplayTime(bookstore.createdDate, 'yyyy-mm-dd hh:mm') : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>노출 상태</div>
          <div className={styles.value}>{bookstore?.status ? bookstore.status : null}</div>
          <div className={styles.key}>노출 일자</div>
          <div className={styles.value}>{bookstore?.exposedDate ? getDisplayTime(bookstore.exposedDate, 'yyyy-mm-dd hh:mm') : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>주소</div>
          <div className={styles.value}>{bookstore?.info?.address ? bookstore.info.address : null}</div>
          <div className={styles.key}>최종 수정일자</div>
          <div className={styles.value}>{bookstore?.modifiedDate ? getDisplayTime(bookstore.modifiedDate, 'yyyy-mm-dd hh:mm') : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>연락처</div>
          <div className={styles.value}>{bookstore?.info?.contact ? bookstore.info.contact : null}</div>
          <div className={styles.key}>SNS</div>
          <div className={styles.value}>{bookstore?.info?.sns ? bookstore.info.sns : null}</div>
        </div>
      </div>
      <div className={buttonStyles.modal_buttons}>
        <button className={buttonStyles.modal_close_btn} onClick={closeBtnHandler}>닫기</button>
        <button className={buttonStyles.modal_apply_btn} onClick={submitBtnHandler}>적용</button>
      </div>
    </section>
  );
};

export default BookstoreDetails;