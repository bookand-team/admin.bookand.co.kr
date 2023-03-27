import Image from 'next/image';
import React, { useCallback } from 'react';

import closeButton from '@images/close_icon.svg';
import buttonStyles from '@styles/components/layout/button.module.scss';
import styles from '@styles/components/layout/modal/details.module.scss';
import { MemberDTO } from '@types';

type Props = {
  member: MemberDTO;
  setOpenModalId: React.Dispatch<React.SetStateAction<number | null>>;
};

const Details = ({ member, setOpenModalId }: Props) => {
  /** 닫기 버튼 - 모달창 닫기 */
  const closeBtnHandler = useCallback(() => {
    setOpenModalId(null);
  }, []);

  /** 적용 버튼 - 수정사항 저장 요청 */
  const submitBtnHandler = useCallback(() => {
    // TODO: 수정사항 저장 요청 기능
    alert('현재 지원하지 않는 기능입니다.');
  }, []);

  /** 탈퇴 버튼 - 회원 탈퇴 처리 요청 */
  const withdrawBtnHandler = useCallback(() => {
    // TODO: 회원 탈퇴 처리 요청 기능
    alert('현재 지원하지 않는 기능입니다.');
  }, []);

  return (
    <section className={styles.container}>
      <button className={styles.close} onClick={closeBtnHandler}>
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
      <div className={buttonStyles.modal_buttons}>
        <button className={buttonStyles.modal_close_btn} onClick={closeBtnHandler}>닫기</button>
        <button className={buttonStyles.modal_apply_btn} onClick={submitBtnHandler}>적용</button>
        <button className={buttonStyles.modal_withdraw_btn} onClick={withdrawBtnHandler}>탈퇴</button>
      </div>
    </section>
  );
};

export default Details;