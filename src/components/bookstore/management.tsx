import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import changeQuery from '../../hooks/change_query';
import getDisplayTime from '../../hooks/get_display_time';
import { isRowInsufficient, makeEmptyArray } from '../../hooks/maintain_table_layout';
import multiCheckBoxHandler from '../../hooks/multi_checkbox_handler';
import { useInputSelect } from '../../hooks/use_input';
import styles from '../../styles/bookstore/management.module.css';
import buttonStyles from '../../styles/layout/button.module.css';
import tableStyles from '../../styles/layout/table.module.css';
import Modal from '../modal';
import Page from '../page';
import Search from '../search';
import Details from './details';

import type { RootState } from 'src/redux/reducers';
import type { BookstoreStatus, BookstoreTheme } from 'src/types';

const Management = () => {
  const router = useRouter();
  const { bookstores, bookstoresLength } = useSelector((state: RootState) => state.bookstores);
  const { page, row } = useSelector((state: RootState) => state.page);

  // checkbox 선택
  const [checkedBoxIds, checkBoxHandler] = multiCheckBoxHandler(page);

  // 선택한 데이터 (테마, 노출상태)
  const [selectTheme, changeSelectTheme] = useInputSelect<BookstoreTheme>('');
  const [selectStatus, changeSelectStatus] = useInputSelect<BookstoreStatus>('');

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>서점 관리</h2>
        <Search search='서점명' />
      </div>
      <div className={styles.contents}>
        <div className={tableStyles.table}>
          <div className={tableStyles.thead}>
            <div className={tableStyles.tr}>
              <div className={styles.check}>선택</div>
              <div className={styles.id}>번호</div>
              <div className={styles.name}>서점명</div>
              <div className={styles.theme}>
                <select value={selectTheme} onChange={changeSelectTheme}>
                  <option value=''>테마</option>
                  <option value='여행'>여행</option>
                  <option value='애완동물'>애완동물</option>
                  <option value='역사'>역사</option>
                  <option value='추리'>추리</option>
                  <option value='그림'>그림</option>
                  <option value='음악'>음악</option>
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
            {bookstores && bookstores.map((bookstore) => {
              return (
                <li key={bookstore.id} className={checkedBoxIds.includes(bookstore.id) ? `${tableStyles.tr} ${tableStyles.checked}` : tableStyles.tr}>
                  <div className={styles.check}>
                    <input type='checkbox' checked={checkedBoxIds.includes(bookstore.id) ? true : false} onChange={(event) => checkBoxHandler(event.target.checked, bookstore.id)} />
                  </div>
                  <div className={styles.id}>{bookstore.id && bookstore.id}</div>
                  <div className={styles.name}>{bookstore.name && bookstore.name}</div>
                  <div className={styles.theme}>{bookstore.theme && bookstore.theme}</div>
                  <div className={styles.status}>{bookstore.status && bookstore.status}</div>
                  <div className={styles.view}>{bookstore.view && bookstore.view}</div>
                  <div className={styles.bookmark}>{bookstore.bookmark && bookstore.bookmark}</div>
                  <div className={styles.createdDate}>{bookstore.createdDate && getDisplayTime(bookstore.createdDate, 'yyyy-mm-dd hh:mm')}</div>
                  <div className={styles.exposedDate}>{bookstore.exposedDate && getDisplayTime(bookstore.exposedDate, 'yyyy-mm-dd hh:mm')}</div>
                  <div className={styles.modifiedDate}>{bookstore.modifiedDate && getDisplayTime(bookstore.modifiedDate, 'yyyy-mm-dd hh:mm')}</div>
                  <div className={styles.button}>
                    <button className={buttonStyles.table_details_btn} onClick={detailsBtnHandler(bookstore.id)}>상세정보</button>
                    <Modal id={bookstore.id} openModalId={openModalId} setOpenModalId={setOpenModalId}>
                      <Details bookstore={bookstore} setOpenModalId={setOpenModalId} />
                    </Modal>
                  </div>
                  <div className={styles.button}><button className={buttonStyles.table_modify_btn} onClick={routePage(`/bookstore/${bookstore.id}`)}>수정</button></div>
                </li>
              );
            })}
            {bookstoresLength && isRowInsufficient(page, row, bookstoresLength) && makeEmptyArray(page, row, bookstoresLength).map((bookstore, idx) => {
              return (
                <li key={idx} className={tableStyles.tr}></li>
              );
            })}
          </ul>
        </div>
      </div>
      {bookstoresLength ? <Page contentsLength={bookstoresLength} /> : null}
      <div className={buttonStyles.buttons}>
        <button className={buttonStyles.register_btn} onClick={routePage('/bookstore/registration')}>새 서점 등록</button>
        <button className={buttonStyles.delete_btn} onClick={deleteBtnHandler}>선택 서점 삭제</button>
      </div>
    </div>
  );
};

export default Management;