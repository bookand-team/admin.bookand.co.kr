import { nanoid } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ArticleDetails from '@components/article/management/details';
import SectionSearchHeader from '@components/common/header/section_search';
import DetailsModal from '@components/common/modal/details';
import ManagementTable from '@components/common/table/management';
import ManagementTableBody from '@components/common/table/management/body';
import ManagementTableHead from '@components/common/table/management/head';
import ManagementTableRow from '@components/common/table/management/row';
import changeQuery from '@hooks/change_query';
import multiCheckBoxHandler from '@hooks/multi_checkbox_handler';
import { useDetailsModal } from '@hooks/use_details_modal';
import { useInputSelect } from '@hooks/use_input';
import { RootState } from '@redux/reducers';
import styles from '@styles/components/article/management.module.scss';
import { ArticleCategory, ArticleCategoryArr, ArticleStatus, ArticleStatusArr } from '@types';
import getDisplayTime from '@utils/get_display_time';

const ArticleManagement = () => {
  const router = useRouter();
  const { articles, articlesLength } = useSelector((state: RootState) => state.article);
  const { page } = useSelector((state: RootState) => state.page);

  // checkbox 선택
  const [checkedBoxIds, checkBoxHandler] = multiCheckBoxHandler(page);

  // 선택한 데이터 (카테고리, 노출상태)
  const [selectCategory, changeSelectCategory] = useInputSelect<'' | ArticleCategory>('');
  const [selectStatus, changeSelectStatus] = useInputSelect<'' | ArticleStatus>('');

  // 상세정보 모달창 상태 관리: [열린 모달창 번호, 모달창 열기, 모달창 닫기]
  const [openModalId, openModal, closeModal] = useDetailsModal();

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

  if (!articles) return <></>;
  return (
    <section className={styles.container}>
      <SectionSearchHeader
        title='아티클 관리'
        search='아티클 제목' />
      <ManagementTable
        head={
          <ManagementTableHead>
            <span className={styles.check}>선택</span>
            <span className={styles.id}>번호</span>
            <span className={styles.title}>아티클 제목</span>
            <span className={styles.category}>
              <select value={selectCategory} onChange={changeSelectCategory}>
                <option value=''>카테고리</option>
                {ArticleCategoryArr.map((value) =>
                  <option key={nanoid()} value={value}>{value}</option>
                )}
              </select>
            </span>
            <span className={styles.status}>
              <select value={selectStatus} onChange={changeSelectStatus}>
                <option value=''>노출상태</option>
                {ArticleStatusArr.map((value) =>
                  <option key={nanoid()} value={value}>{value}</option>
                )}
              </select>
            </span>
            <span className={styles.view}>누적뷰수</span>
            <span className={styles.bookmark}>북마크수</span>
            <span className={styles.createdDate}>등록일자</span>
            <span className={styles.exposedDate}>노출일자</span>
            <span className={styles.modifiedDate}>최종 수정일자</span>
            <span className={styles.button} />
            <span className={styles.button} />
          </ManagementTableHead>}
        body={
          <ManagementTableBody>
            {articles && articles.map((article) => {
              return (
                <ManagementTableRow key={article.id} checked={checkedBoxIds.includes(article.id)}>
                  <span className={styles.check}>
                    <input type='checkbox' checked={checkedBoxIds.includes(article.id)} onChange={(event) => checkBoxHandler(event.target.checked, article.id)} />
                  </span>
                  <span className={styles.id}>{article.id && article.id}</span>
                  <span className={styles.title}>{article.title && article.title}</span>
                  <span className={styles.category}>{article.category && article.category}</span>
                  <span className={styles.status}>{article.status && article.status}</span>
                  <span className={styles.view}>{article.view && article.view}</span>
                  <span className={styles.bookmark}>{article.bookmark && article.bookmark}</span>
                  <span className={styles.createdDate}>{article.createdDate && getDisplayTime(article.createdDate, 'yyyy-mm-dd hh:mm')}</span>
                  <span className={styles.exposedDate}>{article.exposedDate && getDisplayTime(article.exposedDate, 'yyyy-mm-dd hh:mm')}</span>
                  <span className={styles.modifiedDate}>{article.modifiedDate && getDisplayTime(article.modifiedDate, 'yyyy-mm-dd hh:mm')}</span>
                  <span className={styles.button}>
                    <button className={styles.table_details_btn} onClick={openModal(article.id)}>상세정보</button>
                    <DetailsModal id={article.id} openModalId={openModalId} closeModal={closeModal}>
                      <ArticleDetails article={article} closeModal={closeModal} />
                    </DetailsModal>
                  </span>
                  <span className={styles.button}>
                    <button className={styles.table_modify_btn} onClick={routePage(`/article/${article.id}`)}>수정</button>
                  </span>
                </ManagementTableRow>
              );
            })}
          </ManagementTableBody>
        }
        contentsLength={articlesLength}
      />
      <nav className={styles.buttons}>
        <button className={styles.register_btn} onClick={routePage('/article/registration')}>새 아티클 작성</button>
        <button className={styles.delete_btn} onClick={deleteBtnHandler}>선택 아티클 삭제</button>
      </nav>
    </section>
  );
};

export default ArticleManagement;