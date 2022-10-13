import styles from '../../styles/article/management.module.css';
import Page from './page';

const Management = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>아티클 관리</h2>
        <div className={styles.search}>
          <div>
            <div>아티클 제목</div>
            <input />
          </div>
          <button>검색</button>
        </div>
      </div>
      <div className={styles.table}>
        <div className={styles.subjectRow}>
          <div className={styles.id}>번호</div>
          <div className={styles.title}>아티클 제목</div>
          <div className={styles.category}>카테고리</div>
          <div className={styles.view}>누적뷰수</div>
          <div className={styles.bookmark}>북마크수</div>
          <div className={styles.status}>노출상태</div>
          <div className={styles.createdDate}>등록일자</div>
          <div className={styles.exposedDate}>노출일자</div>
          <div className={styles.modifiedDate}>최종 수정일자</div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.title}>nickEx01</div>
          <div className={styles.category}>서점소개</div>
          <div className={styles.view}>1009</div>
          <div className={styles.bookmark}>101</div>
          <div className={styles.status}>노출</div>
          <div className={styles.createdDate}>2022-10-09 00:12</div>
          <div className={styles.exposedDate}>2022-10-12 00:12</div>
          <div className={styles.modifiedDate}>2022-10-12 00:12</div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.title}>nickEx01</div>
          <div className={styles.category}>서점소개</div>
          <div className={styles.view}>1009</div>
          <div className={styles.bookmark}>101</div>
          <div className={styles.status}>노출</div>
          <div className={styles.createdDate}>2022-10-09 00:12</div>
          <div className={styles.exposedDate}>2022-10-12 00:12</div>
          <div className={styles.modifiedDate}>2022-10-12 00:12</div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.title}>nickEx01</div>
          <div className={styles.category}>서점소개</div>
          <div className={styles.view}>1009</div>
          <div className={styles.bookmark}>101</div>
          <div className={styles.status}>노출</div>
          <div className={styles.createdDate}>2022-10-09 00:12</div>
          <div className={styles.exposedDate}>2022-10-12 00:12</div>
          <div className={styles.modifiedDate}>2022-10-12 00:12</div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.title}>nickEx01</div>
          <div className={styles.category}>서점소개</div>
          <div className={styles.view}>1009</div>
          <div className={styles.bookmark}>101</div>
          <div className={styles.status}>노출</div>
          <div className={styles.createdDate}>2022-10-09 00:12</div>
          <div className={styles.exposedDate}>2022-10-12 00:12</div>
          <div className={styles.modifiedDate}>2022-10-12 00:12</div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.title}>nickEx01</div>
          <div className={styles.category}>서점소개</div>
          <div className={styles.view}>1009</div>
          <div className={styles.bookmark}>101</div>
          <div className={styles.status}>노출</div>
          <div className={styles.createdDate}>2022-10-09 00:12</div>
          <div className={styles.exposedDate}>2022-10-12 00:12</div>
          <div className={styles.modifiedDate}>2022-10-12 00:12</div>
        </div>
      </div>
      <Page />
    </div>
  );
};

export default Management;