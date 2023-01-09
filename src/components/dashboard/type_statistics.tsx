import DummyDoughnut from '@components/dashboard/graph/doughnut';
import DummyPie from '@components/dashboard/graph/pie';
import styles from '@styles/dashboard/type_statistics.module.css';

const TypeStatistics = () => {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>유형 통계</h2>
      </div>
      <div className={styles.contents}>
        <div className={styles.subcontents}>
          <h3>탈퇴회원 도넛</h3>
          <div className={styles.graphWrapper}>
            <DummyDoughnut />
          </div>
        </div>
        <div className={styles.subcontents}>
          <h3>피드백 파이</h3>
          <div className={styles.graphWrapper}>
            <DummyPie />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypeStatistics;