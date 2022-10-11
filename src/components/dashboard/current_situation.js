import styles from '../../styles/dashboard/current_situation.module.css';

const CurrentSituation = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles}>현황통계</h2>
      <div>
        <div className={styles.section}>
          <h4>아티클</h4>
          <p>총 게시글 수: 00</p>
          <p>서점소개 게시글 수: 00</p>
          <p>책소개 게시글 수: 00</p>
          <p>인터뷰 게시글 수: 00</p>
        </div>
        <div className={styles.section}>
          <h4>맵</h4>
          <p>API 등록서점 수: 00</p>
          <p>앱 노출서점 수: 00</p>
        </div>
        <div className={styles.section}>
          <h4>북마크</h4>
          <p>총 북마크 수: 00</p>
          <p>북마크 아티클 수: 00</p>
          <p>북마크 서점 수: 00</p>
          <p>회원당 평균 북마크 수: 00</p>
        </div>
        <div className={styles.section}>
          <h4>회원관리</h4>
          <p>총 회원수: 00</p>
          <p>Android 회원수: 00</p>
          <p>IOS 회원수: 00</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentSituation;