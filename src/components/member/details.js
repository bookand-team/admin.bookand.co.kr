import Image from 'next/image';
import { useCallback } from 'react';

import closeButton from '../../images/close_icon.svg';
import styles from '../../styles/member/details.module.css';

const Details = ({ member, setOpenModalId }) => {
  const closeModal = useCallback(() => {
    setOpenModalId(null);
  }, []);

  return (
    <div className={styles.container}>
      <button className={styles.close} onClick={closeModal}>
        <Image src={closeButton} alt='close button' width={32} height={32} />
      </button>
      <h3>회원 상세 정보</h3>
      <div className={styles.contents}>
        <div className={styles.row}>
          <div className={styles.key}>번호</div>
          <div className={styles.value}>{member?.id ? member.id : null}</div>
          <div className={styles.key}>북마크한 아티클 수</div>
          <div className={styles.value}>{member?.bookmarkArticle ? member.bookmarkArticle : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>접속 이메일</div>
          <div className={styles.value}>{member?.email ? member.email : null}</div>
          <div className={styles.key}>북마크한 서점 수</div>
          <div className={styles.value}>{member?.bookmarkBookstore ? member.bookmarkBookstore : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>닉네임</div>
          <div className={styles.value}>{member?.nickname ? member.nickname : null}</div>
          <div className={styles.key}>가입일</div>
          <div className={styles.value}>{member?.createdDate ? member.createdDate : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>이름</div>
          <div className={styles.value}>{member?.name ? member.name : null}</div>
          <div className={styles.key}>최종 접속일</div>
          <div className={styles.value}>{member?.accessedDate ? member.accessedDate : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>역할</div>
          <div className={styles.value}>{member?.role ? member.role : null}</div>
          <div className={styles.key}>탈퇴일</div>
          <div className={styles.value}>{member?.withdrawalDate ? member.withdrawalDate : null}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.key}>이용 상태</div>
          <div className={styles.value}>{member?.status ? member.status : null}</div>
          <div className={styles.key}>징계 사유</div>
          <div className={styles.value}>{member?.disciplineReason ? member.disciplineReason : null}</div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.withdrawal}>탈퇴</button>
        <button className={styles.modification}>수정</button>
      </div>
    </div>
  );
};

export default Details;