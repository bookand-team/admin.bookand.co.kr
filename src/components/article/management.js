import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import changeQuery from '../../hooks/change_query';
import getDisplayTime from '../../hooks/get_display_time';
import { isRowInsufficient, makeEmptyArray } from '../../hooks/maintain_table_layout';
import useCheckBoxes from '../../hooks/use_checkboxes';
import useInput from '../../hooks/use_input';
import { deleteArticles } from '../../redux/actions/articles';
import styles from '../../styles/article/management.module.css';
import buttonStyles from '../../styles/layout/button.module.css';
import tableStyles from '../../styles/layout/table.module.css';
import Page from '../page';
import Search from '../search';

const Management = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { articles, articlesLength } = useSelector((state) => state.articles);
  const { page, row } = useSelector((state) => state.page);

  // checkbox 선택
  const [checkBoxes, checkBoxHandler] = useCheckBoxes(page);

  // category 선택
  const [selectCategory, changeSelectCategory] = useInput('');
  useEffect(() => {
    const newQuery = changeQuery(router, { category: selectCategory });
    router.push(`${router.pathname}${newQuery}`);
  }, [selectCategory]);

  // status 선택
  const [selectStatus, changeSelectStatus] = useInput('');
  useEffect(() => {
    const newQuery = changeQuery(router, { status: selectStatus });
    router.push(`${router.pathname}${newQuery}`);
  }, [selectStatus]);

  // articles 삭제 요청
  const deleteArticlesHandler = useCallback(() => {
    dispatch(deleteArticles({ articleIds: checkBoxes }));
    alert(`${checkBoxes}번 아티클 삭제 완료`);
  }, [checkBoxes]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>아티클 관리</h2>
        <Search search='아티클 제목' />
      </div>
      <div className={styles.contents}>
        <div className={tableStyles.table}>
          <div className={tableStyles.thead}>
            <div className={tableStyles.tr}>
              <div className={styles.check}>선택</div>
              <div className={styles.id}>번호</div>
              <div className={styles.title}>아티클 제목</div>
              <div className={styles.category}>
                <select value={selectCategory} onChange={changeSelectCategory}>
                  <option value=''>카테고리</option>
                  <option value='서점소개'>서점소개</option>
                  <option value='책소개'>책소개</option>
                  <option value='인터뷰'>인터뷰</option>
                </select>
              </div>
              <div className={styles.status}>
                <select value={selectStatus} onChange={changeSelectStatus}>
                  <option value=''>노출상태</option>
                  <option value='노출'>노출</option>
                  <option value='미노출'>미노출</option>
                </select>
              </div>
              <div className={styles.view}>누적뷰수</div>
              <div className={styles.bookmark}>북마크수</div>
              <div className={styles.createdDate}>등록일자</div>
              <div className={styles.exposedDate}>노출일자</div>
              <div className={styles.modifiedDate}>최종 수정일자</div>
            </div>
          </div>
          <ul>
            {articles && articles.map((article) => {
              return (
                <li key={article.id} className={tableStyles.tr}>
                  <div className={styles.check}>
                    <input type='checkbox' checked={checkBoxes.includes(article.id) ? true : false} onChange={(event) => checkBoxHandler(event.target.checked, article.id)} />
                  </div>
                  <div className={styles.id}>{article.id && article.id}</div>
                  <div className={styles.title}>{article.title && article.title}</div>
                  <div className={styles.category}>{article.category && article.category}</div>
                  <div className={styles.status}>{article.status && article.status}</div>
                  <div className={styles.view}>{article.view && article.view}</div>
                  <div className={styles.bookmark}>{article.bookmark && article.bookmark}</div>
                  <div className={styles.createdDate}>{article.createdDate && getDisplayTime(article.createdDate, 'yyyy-mm-dd hh:mm')}</div>
                  <div className={styles.exposedDate}>{article.exposedDate && getDisplayTime(article.exposedDate, 'yyyy-mm-dd hh:mm')}</div>
                  <div className={styles.modifiedDate}>{article.modifiedDate && getDisplayTime(article.modifiedDate, 'yyyy-mm-dd hh:mm')}</div>
                </li>
              );
            })}
            {isRowInsufficient(page, row, articlesLength) && makeEmptyArray(page, row, articlesLength).map((article, idx) => {
              return (
                <li key={idx} className={tableStyles.tr}></li>
              );
            })}
          </ul>
        </div>
      </div>
      <Page tableRow={row} contentsLength={articlesLength} />
      <div className={buttonStyles.buttons}>
        <button className={buttonStyles.registration}>새 아티클 작성</button>
        <button className={buttonStyles.removal} onClick={deleteArticlesHandler}>선택 아티클 삭제</button>
      </div>
    </div>
  );
};

export default Management;