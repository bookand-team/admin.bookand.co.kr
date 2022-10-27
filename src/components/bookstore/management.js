import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import changeQuery from '../../hooks/change_query';
import getDisplayTime from '../../hooks/get_display_time';
import { isRowInsufficient, makeEmptyArray } from '../../hooks/maintain_table_layout';
import useCheckBoxes from '../../hooks/use_checkboxes';
import useInput from '../../hooks/use_input';
import styles from '../../styles/bookstore/management.module.css';
import buttonStyles from '../../styles/layout/button.module.css';
import tableStyles from '../../styles/layout/table.module.css';
import Page from '../page';
import Search from '../search';

const Management = () => {
  const router = useRouter();
  const { bookstores, bookstoresLength } = useSelector((state) => state.bookstores);
  const { page, row } = useSelector((state) => state.page);

  // checkbox 선택
  const [checkBoxes, checkBoxHandler] = useCheckBoxes(page);

  // theme 선택
  const [selectTheme, changeSelectTheme] = useInput('');
  useEffect(() => {
    const newQuery = changeQuery(router, { theme: selectTheme });
    router.push(`${router.pathname}${newQuery}`);
  }, [selectTheme]);

  // status 선택
  const [selectStatus, changeSelectStatus] = useInput('');
  useEffect(() => {
    const newQuery = changeQuery(router, { status: selectStatus });
    router.push(`${router.pathname}${newQuery}`);
  }, [selectStatus]);

  /** 새 컨텐츠 등록 페이지 이동 */
  const moveRegistration = useCallback(() => {
    router.push('/bookstore/registration');
  }, []);

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
            </div>
          </div>
          <ul>
            {bookstores && bookstores.map((bookstore) => {
              return (
                <li key={bookstore.id} className={tableStyles.tr}>
                  <div className={styles.check}>
                    <input type='checkbox' checked={checkBoxes.includes(bookstore.id) ? true : false} onChange={(event) => checkBoxHandler(event.target.checked, bookstore.id)} />
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
                </li>
              );
            })}
            {isRowInsufficient(page, row, bookstoresLength) && makeEmptyArray(page, row, bookstoresLength).map((bookstore, idx) => {
              return (
                <li key={idx} className={tableStyles.tr}></li>
              );
            })}
          </ul>
        </div>
      </div>
      <Page tableRow={row} contentsLength={bookstoresLength} />
      <div className={buttonStyles.buttons}>
        <button className={buttonStyles.registration} onClick={moveRegistration}>새 서점 등록</button>
        <button className={buttonStyles.removal}>선택 서점 삭제</button>
      </div>
    </div>
  );
};

export default Management;