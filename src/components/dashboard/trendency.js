import styles from '../../styles/dashboard/trendency.module.css';
import Article from './graph/article';

const Trendency = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>추이 통계</h2>
      </div>
      <div className={styles.contents}>
        <div className={styles.subcontents}>
          <h3>아티클</h3>
          <div className={styles.graphWrapper}>
            <Article />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trendency;