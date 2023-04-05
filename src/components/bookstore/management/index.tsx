import { nanoid } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import BookstoreDetails from '@components/bookstore/management/details';
import SectionSearchHeader from '@components/common/header/section_search';
import Modal from '@components/common/modal';
import ManagementTable from '@components/common/table/management';
import ManagementTableBody from '@components/common/table/management/body';
import ManagementTableHead from '@components/common/table/management/head';
import ManagementTableRow from '@components/common/table/management/row';
import changeQuery from '@hooks/change_query';
import multiCheckBoxHandler from '@hooks/multi_checkbox_handler';
import { useInputSelect } from '@hooks/use_input';
import { RootState } from '@redux/reducers';
import styles from '@styles/components/bookstore/management.module.scss';
import buttonStyles from '@styles/layout/button.module.scss';
import { BookstoreStatus, BookstoreStatusArr, BookstoreTheme, BookstoreThemeArr } from '@types';
import getDisplayTime from '@utils/get_display_time';

const BookstoreManagement = () => {
  const router = useRouter();
  const { bookstores, bookstoresLength } = useSelector((state: RootState) => state.bookstore);
  const { page } = useSelector((state: RootState) => state.page);

  // checkbox 선택
  const [checkedBoxIds, checkBoxHandler] = multiCheckBoxHandler(page);

  // 선택한 데이터 (테마, 노출상태)
  const [selectTheme, changeSelectTheme] = useInputSelect<'' | BookstoreTheme>('');
  const [selectStatus, changeSelectStatus] = useInputSelect<'' | BookstoreStatus>('');

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

  /** 삭제 버튼 - 선택한 서점 삭제 요청 */
  const deleteBtnHandler = useCallback(() => {
    // TODO: 선택한 서점 삭제 요청 기능
    if (checkedBoxIds.length === 0) {
      alert('선택된 서점이 존재하지 않습니다.');
    } else {
      const sortedCheckboxes = [...checkedBoxIds];
      if (confirm(`${sortedCheckboxes.sort()}번 서점을 삭제 처리하시겠습니까?\n삭제한 서점은 저장되지 않습니다.`)) {
        alert('현재 지원하지 않는 기능입니다.');
      }
    }
  }, [checkedBoxIds]);

  useEffect(() => {
    const newQuery = changeQuery(router.query, { theme: selectTheme, status: selectStatus });
    router.push({ pathname: router.pathname, query: newQuery });
  }, [selectTheme, selectStatus]);

  if (!bookstores) return;
  return (
    <section className={styles.container}>
      <SectionSearchHeader
        title='서점 관리'
        search='서점명' />
      <ManagementTable
        head={
          <ManagementTableHead>
            <span className={styles.check}>선택</span>
            <span className={styles.id}>번호</span>
            <span className={styles.name}>서점명</span>
            <span className={styles.theme}>
              <select value={selectTheme} onChange={changeSelectTheme}>
                <option value=''>테마</option>
                {BookstoreThemeArr.map((value) =>
                  <option key={nanoid()} value={value}>{value}</option>
                )}
              </select>
            </span>
            <span className={styles.status}>
              <select value={selectStatus} onChange={changeSelectStatus}>
                <option value=''>노출상태</option>
                {BookstoreStatusArr.map((value) =>
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
          </ManagementTableHead>
        }
        body={
          <ManagementTableBody contentsLength={bookstoresLength}>
            {bookstores && bookstores.map((bookstore) => {
              return (
                <ManagementTableRow key={bookstore.id} checked={checkedBoxIds.includes(bookstore.id)}>
                  <span className={styles.check}>
                    <input type='checkbox' checked={checkedBoxIds.includes(bookstore.id)} onChange={(event) => checkBoxHandler(event.target.checked, bookstore.id)} />
                  </span>
                  <span className={styles.id}>{bookstore.id && bookstore.id}</span>
                  <span className={styles.name}>{bookstore.name && bookstore.name}</span>
                  <span className={styles.theme}>{bookstore.theme && bookstore.theme}</span>
                  <span className={styles.status}>{bookstore.status && bookstore.status}</span>
                  <span className={styles.view}>{bookstore.view && bookstore.view}</span>
                  <span className={styles.bookmark}>{bookstore.bookmark && bookstore.bookmark}</span>
                  <span className={styles.createdDate}>{bookstore.createdDate && getDisplayTime(bookstore.createdDate, 'yyyy-mm-dd hh:mm')}</span>
                  <span className={styles.exposedDate}>{bookstore.exposedDate && getDisplayTime(bookstore.exposedDate, 'yyyy-mm-dd hh:mm')}</span>
                  <span className={styles.modifiedDate}>{bookstore.modifiedDate && getDisplayTime(bookstore.modifiedDate, 'yyyy-mm-dd hh:mm')}</span>
                  <span className={styles.button}>
                    <button className={buttonStyles.table_details_btn} onClick={detailsBtnHandler(bookstore.id)}>상세정보</button>
                    <Modal id={bookstore.id} openModalId={openModalId} setOpenModalId={setOpenModalId}>
                      <BookstoreDetails bookstore={bookstore} setOpenModalId={setOpenModalId} />
                    </Modal>
                  </span>
                  <span className={styles.button}><button className={buttonStyles.table_modify_btn} onClick={routePage(`/bookstore/${bookstore.id}`)}>수정</button></span>
                </ManagementTableRow>
              );
            })}
          </ManagementTableBody>
        }
        contentsLength={bookstoresLength}
      />
      <div className={buttonStyles.buttons}>
        <button className={buttonStyles.register_btn} onClick={routePage('/bookstore/registration')}>새 서점 등록</button>
        <button className={buttonStyles.delete_btn} onClick={deleteBtnHandler}>선택 서점 삭제</button>
      </div>
    </section>
  );
};

export default BookstoreManagement;