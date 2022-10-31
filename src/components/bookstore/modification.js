import styles from '../../styles/bookstore/modification.module.css';

const Modification = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>서점 수정</h2>
      </div>
      <div className={styles.contents}>
        <div className={styles.search}>
          <div>
            <div>서점 API값</div>
            <input />
          </div>
          <button>검색</button>
        </div>
        <div className={styles.info}>
          <h3 className={styles.h3}>API 정보관리</h3>
          <div>
            <div><div>주소</div><input /></div>
            <div><div>영업시간</div><input /></div>
            <div><div>전화번호</div><input /></div>
            <div><div>시설정보</div><input /></div>
            <div><div>인스타</div><input /></div>
          </div>
        </div>
        <div className={styles.info}>
          <h3 className={styles.h3}>추가작성 정보관리</h3>
          <div>
            <div><div>한줄소개</div><input /></div>
            <div><div>테마</div><input /></div>
            <div>서점 상세페이지 노출 이미지 관리</div>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.registration}>수정하기</button>
        <button className={styles.removal}>삭제하기</button>
      </div>
    </div>
  );
};

export default Modification;