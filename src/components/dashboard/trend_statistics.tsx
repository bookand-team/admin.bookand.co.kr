import styles from '../../styles/dashboard/trend_statistics.module.css';
import DummyArea from './graph/area';
import DummyBar from './graph/bar';
import DummyComplex from './graph/complex';
import DummyGroupBar from './graph/group_bar';
import DummyMultiaxis from './graph/multiaxis';
import DummyStackBar from './graph/stack_bar';

const TrendStatistics = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>추이 통계</h2>
      </div>
      <div className={styles.contents}>
        <div className={styles.subcontents}>
          <h3>아티클 기본막대</h3>
          <div className={styles.graphWrapper}>
            <DummyBar />
          </div>
        </div>
        <div className={styles.subcontents}>
          <h3>서점 그룹막대</h3>
          <div className={styles.graphWrapper}>
            <DummyGroupBar />
          </div>
        </div>
        <div className={styles.subcontents}>
          <h3>북마크 누적막대</h3>
          <div className={styles.graphWrapper}>
            <DummyStackBar />
          </div>
        </div>
        <div className={styles.subcontents}>
          <h3>회원관리 두 꺾은선+두 세로축</h3>
          <div className={styles.graphWrapper}>
            <DummyMultiaxis />
          </div>
        </div>
        <div className={styles.subcontents}>
          <h3>회원관리 그룹막대+두 꺾은선</h3>
          <div className={styles.graphWrapper}>
            <DummyComplex />
          </div>
        </div>
        <div className={styles.subcontents}>
          <h3>회원관리 영역꺾은선</h3>
          <div className={styles.graphWrapper}>
            <DummyArea />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendStatistics;