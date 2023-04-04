import Image from 'next/image';
import React, { useCallback } from 'react';

import closeButton from '@images/close_icon.svg';
import buttonStyles from '@styles/layout/button.module.scss';
import styles from '@styles/layout/modal/details.module.scss';
import { ArticleDTO } from '@types';
import getDisplayTime from '@utils/get_display_time';

type PropsType = {
  article: ArticleDTO;
  setOpenModalId: React.Dispatch<React.SetStateAction<number | null>>;
};

const ArticleDetails = ({ article, setOpenModalId }: PropsType) => {
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
      <h3>아티클 상세 정보</h3>
      <div className={styles.contents}>
        <div className={styles.row}>
          <div className={styles.key}>번호</div>
          <div className={styles.value}>{article?.id ? article.id : null}</div>
          <div className={styles.key}>북마크 수</div>
          <div className={styles.value}>{article?.bookmark ? article.bookmark : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>아티클 제목</div>
          <div className={styles.value}>{article?.title ? article.title : null}</div>
          <div className={styles.key}>누적 조회수</div>
          <div className={styles.value}>{article?.view ? article.view : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>카테고리</div>
          <div className={styles.value}>{article?.category ? article.category : null}</div>
          <div className={styles.key}>등록일자</div>
          <div className={styles.value}>{article?.createdDate ? getDisplayTime(article.createdDate, 'yyyy-mm-dd hh:mm') : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>노출 상태</div>
          <div className={styles.value}>{article?.status ? article.status : null}</div>
          <div className={styles.key}>노출 일자</div>
          <div className={styles.value}>{article?.exposedDate ? getDisplayTime(article.exposedDate, 'yyyy-mm-dd hh:mm') : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>작성자</div>
          <div className={styles.value}>{article?.writer ? article.writer : null}</div>
          <div className={styles.key}>최종 수정일자</div>
          <div className={styles.value}>{article?.modifiedDate ? getDisplayTime(article.modifiedDate, 'yyyy-mm-dd hh:mm') : null}</div>
        </div>
      </div>
      <div className={buttonStyles.modal_buttons}>
        <button className={buttonStyles.modal_close_btn} onClick={closeBtnHandler}>닫기</button>
        <button className={buttonStyles.modal_apply_btn} onClick={submitBtnHandler}>적용</button>
      </div>
    </section>
  );
};

export default ArticleDetails;