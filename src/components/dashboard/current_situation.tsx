import SectionHeader from '@components/common/section_header';
import styles from '@styles/components/dashboard/current_situation.module.scss';

const CurrentSituation = () => {
  return (
    <section className={styles.container}>
      <SectionHeader title='현황 통계' />
      <div className={styles.contents}>
        <div className={styles.half}>
          <div className={styles.section}>
            <h4>아티클</h4>
            <p>총 게시글 수: 500</p>
            <p>서점소개 게시글 수: 177</p>
            <p>책소개 게시글 수: 160</p>
            <p>인터뷰 게시글 수: 163</p>
          </div>
          <div className={styles.section}>
            <h4>서점</h4>
            <p>등록서점 수: 500</p>
            <p>노출서점 수: 453</p>
            <p>미노출서점 수: 47</p>
          </div>
          <div className={styles.section}>
            <h4>북마크</h4>
            <p>총 북마크 수: 8669</p>
            <p>아티클 북마크 수: 4225</p>
            <p>회원당 아티클 북마크 수: 14.18</p>
            <p>북마크 서점 수: 4444</p>
            <p>회원당 서점 북마크 수: 14.81</p>
          </div>
        </div>
        <div className={styles.half}>
          <div className={styles.section}>
            <h4>회원</h4>
            <p>총 회원 수: 300</p>
            <p>Android 회원 수: 161</p>
            <p>IOS 회원 수: 139</p>
          </div>
          <div className={styles.section}>
            <h4>탈퇴회원</h4>
            <p>총 탈퇴회원 수: 50</p>
            <p>Android 회원 수: 23</p>
            <p>IOS 회원 수: 27</p>
          </div>
          <div className={styles.section}>
            <h4>서점제보</h4>
            <p>서점제보 수: 300</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentSituation;