import { nanoid } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import SectionSearchHeader from '@components/common/header/section_search';
import ManagementTable from '@components/common/table/management';
import ManagementTableBody from '@components/common/table/management/body';
import ManagementTableHead from '@components/common/table/management/head';
import ManagementTableRow from '@components/common/table/management/row';
import changeQuery from '@hooks/change_query';
import multiCheckBoxHandler from '@hooks/multi_checkbox_handler';
import { useInputSelect } from '@hooks/use_input';
import { RootState } from '@redux/reducers';
import styles from '@styles/components/bookstore/management.module.scss';
import { BookstoreStatusKey, BookstoreStatusMapping, BookstoreThemeKey, BookstoreThemeMapping } from '@types';
import getDisplayTime from '@utils/get_display_time';
import { convertBookstoreProperty } from '@utils/mapping_handler';

const BookstoreManagement = () => {
  const router = useRouter();
  const { bookstoreList } = useSelector((state: RootState) => state.bookstore);
  const { page } = useSelector((state: RootState) => state.page);

  // checkbox 선택
  const [checkedBoxIds, checkBoxHandler] = multiCheckBoxHandler(page);

  // 선택한 데이터 (테마, 노출상태)
  const [selectTheme, changeSelectTheme] = useInputSelect<'' | BookstoreThemeKey>('');
  const [selectStatus, changeSelectStatus] = useInputSelect<'' | BookstoreStatusKey>('');

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

  return (
    <section className={styles.container}>
      {bookstoreList && <>
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
                  {BookstoreThemeMapping.map((theme) => {
                    if (theme.value === '') { return <option key={nanoid()} value={theme.key}>미분류</option>; }
                    return <option key={nanoid()} value={theme.key}>{theme.value}</option>;
                  })}
                </select>
              </span>
              <span className={styles.view}>누적뷰수</span>
              <span className={styles.createdDate}>등록일자</span>
              <span className={styles.displayDate}>노출일자</span>
              <span className={styles.modifiedDate}>최종 수정일자</span>
              <span className={styles.status}>
                <select value={selectStatus} onChange={changeSelectStatus}>
                  <option value=''>노출상태</option>
                  {BookstoreStatusMapping.map((status) =>
                    <option key={nanoid()} value={status.key}>{status.value}</option>
                  )}
                </select>
              </span>
              <span className={styles.button} />
            </ManagementTableHead>
          }
          body={
            <ManagementTableBody>
              {bookstoreList.content && bookstoreList.content.map((bookstore) => {
                return (
                  <ManagementTableRow key={bookstore.id} checked={checkedBoxIds.includes(bookstore.id)}>
                    <span className={styles.check}>
                      <input type='checkbox' checked={checkedBoxIds.includes(bookstore.id)} onChange={(event) => checkBoxHandler(event.target.checked, bookstore.id)} />
                    </span>
                    <span className={styles.id}>{bookstore.id}</span>
                    <span className={styles.name}>{bookstore.name}</span>
                    <span className={styles.theme}>{bookstore.theme.map(value => convertBookstoreProperty('theme', value)).join(', ')}</span>
                    <span className={styles.view}>{bookstore.view}</span>
                    <span className={styles.createdDate}>{getDisplayTime(bookstore.createdDate, 'yyyy-mm-dd hh:mm')}</span>
                    <span className={styles.displayDate}>{getDisplayTime(bookstore.displayDate, 'yyyy-mm-dd hh:mm')}</span>
                    <span className={styles.modifiedDate}>{getDisplayTime(bookstore.modifiedDate, 'yyyy-mm-dd hh:mm')}</span>
                    <span className={styles.status}>{convertBookstoreProperty('status', bookstore.status)}</span>
                    <span className={styles.button}>
                      <button className={styles.table_modify_btn} onClick={routePage(`/bookstore/${bookstore.id}`)}>수정</button>
                    </span>
                  </ManagementTableRow>
                );
              })}
            </ManagementTableBody>
          }
          contentsLength={bookstoreList.totalElements}
        />
        <nav className={styles.buttons}>
          <button className={styles.register_btn} onClick={routePage('/bookstore/registration')}>새 서점 등록</button>
          <button className={styles.delete_btn} onClick={deleteBtnHandler}>선택 서점 삭제</button>
        </nav>
      </>}
    </section>
  );
};

export default BookstoreManagement;