import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import changeQuery from '../../hooks/change_query';
import getDisplayTime from '../../hooks/get_display_time';
import { isRowInsufficient, makeEmptyArray } from '../../hooks/maintain_table_layout';
import useCheckBoxes from '../../hooks/use_checkboxes';
import useInput from '../../hooks/use_input';
import styles from '../../styles/article/management.module.css';
import buttonStyles from '../../styles/layout/button.module.css';
import tableStyles from '../../styles/layout/table.module.css';
import Modal from '../modal';
import Page from '../page';
import Search from '../search';
import Details from './details';

const Management = () => {
  const router = useRouter();
  const { articles, articlesLength } = useSelector((state) => state.articles);
  const { page, row } = useSelector((state) => state.page);

  // checkbox 선택
  const [checkBoxes, checkBoxHandler] = useCheckBoxes(page);

  // 선택한 데이터 (카테고리, 노출상태)
  const [selectCategory, changeSelectCategory] = useInput('');
  const [selectStatus, changeSelectStatus] = useInput('');

  // 열려있는 모달창 식별자 상태
  const [openModalId, setOpenModalId] = useState(null);

  /** 모달창 열기 */
  const openModal = useCallback((id) => () => {
    setOpenModalId(id);
  }, []);

  /** 원하는 페이지로 이동*/
  const routePage = useCallback((url) => () => {
    router.push(url);
  }, []);

  /** 선택 아티클 삭제 버튼 */
  const deleteSelectionBtnHandler = useCallback(() => {
    // TODO:
    if (checkBoxes.length === 0) {
      alert('선택된 아티클이 존재하지 않습니다.');
    } else {
      const sortedCheckboxes = [...checkBoxes];
      if (confirm(`${sortedCheckboxes.sort()}번 아티클을 삭제 처리하시겠습니까?\n삭제한 아티클은 저장되지 않습니다.`)) {
        alert('현재 지원하지 않는 기능입니다.');
      }
    }
  }, [checkBoxes]);

  useEffect(() => {
    const newQuery = changeQuery(router.query, { category: selectCategory, status: selectStatus });
    router.push({ pathname: router.pathname, query: newQuery });
  }, [selectCategory, selectStatus]);

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
              <div className={styles.button}></div>
              <div className={styles.button}></div>
            </div>
          </div>
          <ul className={tableStyles.tbody}>
            {articles && articles.map((article) => {
              return (
                <li key={article.id} className={checkBoxes.includes(article.id) ? `${tableStyles.tr} ${tableStyles.checked}` : tableStyles.tr}>
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
                  <div className={styles.button}>
                    <button onClick={openModal(article.id)}>상세정보</button>
                    <Modal id={article.id} openModalId={openModalId} setOpenModalId={setOpenModalId}>
                      <Details article={article} setOpenModalId={setOpenModalId} />
                    </Modal>
                  </div>
                  <div className={styles.button}><button onClick={routePage(`/article/${article.id}`)}>수정</button></div>
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
        <button className={buttonStyles.registration} onClick={routePage('/article/registration')}>새 아티클 작성</button>
        <button className={buttonStyles.removal} onClick={deleteSelectionBtnHandler}>선택 아티클 삭제</button>
      </div>
    </div>
  );
};

export default Management;