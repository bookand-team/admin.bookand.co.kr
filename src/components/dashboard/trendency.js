import styles from '../../styles/dashboard/trendency.module.css';

const Trendency = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>추이 통계</h2>
      </div>
      <div className={styles.contents}>
        그래프 자리
      </div>
    </div>
  );
};

export default Trendency;