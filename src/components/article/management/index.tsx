import { nanoid } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ArticleDetails from '@components/article/management/details';
import SectionSearchHeader from '@components/common/header/section_search';
import Modal from '@components/common/modal';
import ResponsivePageNavbar from '@components/common/page_navbar';
import changeQuery from '@hooks/change_query';
import { isRowInsufficient, makeEmptyArray } from '@hooks/maintain_table_layout';
import multiCheckBoxHandler from '@hooks/multi_checkbox_handler';
import { useInputSelect } from '@hooks/use_input';
import { RootState } from '@redux/reducers';
import styles from '@styles/components/article/management.module.scss';
import buttonStyles from '@styles/layout/button.module.scss';
import tableStyles from '@styles/layout/table.module.scss';
import { ArticleCategory, ArticleCategoryArr, ArticleStatus, ArticleStatusArr } from '@types';
import getDisplayTime from '@utils/get_display_time';

const ArticleManagement = () => {
  const router = useRouter();
  const { articles, articlesLength } = useSelector((state: RootState) => state.article);
  const { page, row } = useSelector((state: RootState) => state.page);

  // checkbox 선택
  const [checkedBoxIds, checkBoxHandler] = multiCheckBoxHandler(page);

  // 선택한 데이터 (카테고리, 노출상태)
  const [selectCategory, changeSelectCategory] = useInputSelect<'' | ArticleCategory>('');
  const [selectStatus, changeSelectStatus] = useInputSelect<'' | ArticleStatus>('');

  // 열려있는 모달창 식별자 상태
  const [openModalId, setOpenModalId] = useState<number | null>(null);

  /** 상세정보 버튼 - 모달창 열기 */
  const detailsBtnHandler = useCallback((id: number) => () => {
    setOpenModalId(id);
  }, []);

  /** 수정 버튼, 생성 버튼 - 원하는 페이지로 이동 */
  const routePage = useCallback((url: string) => () => {
    router.push(url);
  }, []);

  /** 삭제 버튼 - 선택한 아티클 삭제 요청 */
  const deleteBtnHandler = useCallback(() => {
    // TODO: 선택한 아티클 삭제 요청 기능
    if (checkedBoxIds.length === 0) {
      alert('선택된 아티클이 존재하지 않습니다.');
    } else {
      const sortedCheckboxes = [...checkedBoxIds];
      if (confirm(`${sortedCheckboxes.sort()}번 아티클을 삭제 처리하시겠습니까?\n삭제한 아티클은 저장되지 않습니다.`)) {
        alert('현재 지원하지 않는 기능입니다.');
      }
    }
  }, [checkedBoxIds]);

  useEffect(() => {
    const newQuery = changeQuery(router.query, { category: selectCategory, status: selectStatus });
    router.push({ pathname: router.pathname, query: newQuery });
  }, [selectCategory, selectStatus]);

  return (
    <>
      {articles &&
        <section className={styles.container}>
          <SectionSearchHeader
            title='아티클 관리'
            search='아티클 제목' />
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
                      {ArticleCategoryArr.map((value) =>
                        <option key={nanoid()} value={value}>{value}</option>
                      )}
                    </select>
                  </div>
                  <div className={styles.status}>
                    <select value={selectStatus} onChange={changeSelectStatus}>
                      <option value=''>노출상태</option>
                      {ArticleStatusArr.map((value) =>
                        <option key={nanoid()} value={value}>{value}</option>
                      )}
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
                    <li key={article.id} className={checkedBoxIds.includes(article.id) ? `${tableStyles.tr} ${tableStyles.checked}` : tableStyles.tr}>
                      <div className={styles.check}>
                        <input type='checkbox' checked={checkedBoxIds.includes(article.id) ? true : false} onChange={(event) => checkBoxHandler(event.target.checked, article.id)} />
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
                        <button className={buttonStyles.table_details_btn} onClick={detailsBtnHandler(article.id)}>상세정보</button>
                        <Modal id={article.id} openModalId={openModalId} setOpenModalId={setOpenModalId}>
                          <ArticleDetails article={article} setOpenModalId={setOpenModalId} />
                        </Modal>
                      </div>
                      <div className={styles.button}><button className={buttonStyles.table_modify_btn} onClick={routePage(`/article/${article.id}`)}>수정</button></div>
                    </li>
                  );
                })}
                {articlesLength && isRowInsufficient(page, row, articlesLength) && makeEmptyArray(page, row, articlesLength).map((article, idx) => {
                  return (
                    <li key={idx} className={tableStyles.tr}></li>
                  );
                })}
              </ul>
            </div>
          </div>
          {articlesLength ? <ResponsivePageNavbar contentsLength={articlesLength} /> : null}
          <div className={buttonStyles.buttons}>
            <button className={buttonStyles.register_btn} onClick={routePage('/article/registration')}>새 아티클 작성</button>
            <button className={buttonStyles.delete_btn} onClick={deleteBtnHandler}>선택 아티클 삭제</button>
          </div>
        </section>
      }
    </>
  );
};

export default ArticleManagement;