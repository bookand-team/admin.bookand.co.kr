import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import styles from '../../styles/article/management.module.css';
import tableStyles from '../../styles/layout/table.module.css';
import Page from '../page';

const Management = () => {
  const { articles, articlesLength } = useSelector(state => state.articles);

  const tableRows = 5;
  const emptyArray = useCallback(() => {
    const ret = [];
    for (var i = 0; i < tableRows - articlesLength; i++) {
      ret.push(null);
    }
    return ret;
  }, []);

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
      <div className={styles.contents}>
        <div className={tableStyles.table}>
          <div className={tableStyles.thead}>
            <div className={tableStyles.tr}>
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
          </div>
          <ul>
            {articles.map((article) => {
              return (
                <li key={article.id} className={tableStyles.tr}>
                  <div className={styles.id}>{article.id && article.id}</div>
                  <div className={styles.title}>{article.title && article.title}</div>
                  <div className={styles.category}>{article.category && article.category}</div>
                  <div className={styles.view}>{article.view && article.view}</div>
                  <div className={styles.bookmark}>{article.bookmark && article.bookmark}</div>
                  <div className={styles.status}>{article.status && article.status}</div>
                  <div className={styles.createdDate}>{article.createdDate && article.createdDate}</div>
                  <div className={styles.exposedDate}>{article.exposedDate && article.exposedDate}</div>
                  <div className={styles.modifiedDate}>{article.modifiedDate && article.modifiedDate}</div>
                </li>
              );
            })}
            {articlesLength !== tableRows && emptyArray().map((article, idx) => {
              return (
                <li key={idx} className={tableStyles.tr}></li>
              );
            })}
          </ul>
        </div>
      </div>
      <Page />
    </div>
  );
};

export default Management;