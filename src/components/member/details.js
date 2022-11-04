import styles from '../../styles/member/details.module.css';

const Details = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>회원 상세 정보</h2>
      </div>
      <div className={styles.contents}>
        <div className={styles.row}>
          <div>Member ID</div>
          <div>{/* feature*/}현재 지원하지 않는 기능입니다.</div>
          <div>상태</div>
          <div>{/* feature*/}현재 지원하지 않는 기능입니다.</div>
        </div>
        <div className={styles.row}>
          <div>이메일</div>
          <div>{/* feature*/}현재 지원하지 않는 기능입니다.</div>
          <div>가입일</div>
          <div>{/* feature*/}현재 지원하지 않는 기능입니다.</div>
        </div>
        <div className={styles.row}>
          <div>닉네임</div>
          <div>{/* feature*/}현재 지원하지 않는 기능입니다.</div>
          <div>접속일</div>
          <div>{/* feature*/}현재 지원하지 않는 기능입니다.</div>
        </div>
        <div className={styles.row}>
          <div>이름</div>
          <div>{/* feature*/}현재 지원하지 않는 기능입니다.</div>
          <div>북마크한 아티클 수</div>
          <div>{/* feature*/}현재 지원하지 않는 기능입니다.</div>
        </div>
        <div className={styles.row}>
          <div>타입</div>
          <div>{/* feature*/}현재 지원하지 않는 기능입니다.</div>
          <div>북마크한 서점 수</div>
          <div>{/* feature*/}현재 지원하지 않는 기능입니다.</div>
        </div>
      </div>
    </div>
  )
};

export default Details;