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

  // 선택한 데이터 (테마, 노출상태)
  const [selectTheme, changeSelectTheme] = useInput('');
  const [selectStatus, changeSelectStatus] = useInput('');

  /** status(노출상태) 변경 요청 */
  const changeStatusHandler = useCallback((id, status) => () => {
    if (status === '미노출' && confirm('해당 서점을 노출 처리하시겠습니까?\n노출 전 서점 정보를 꼼꼼히 확인해주세요.')) {
      // feature
      alert('현재 지원하지 않는 기능입니다.');
    } else if (status === '노출' && confirm('해당 서점을 미노출 처리하시겠습니까?')) {
      // feature
      alert('현재 지원하지 않는 기능입니다.');
    }
  }, []);

  /** 원하는 페이지로 이동*/
  const moveToOtherPageHandler = useCallback((url) => () => {
    router.push(url);
  }, []);

  /** 선택 항목 삭제 요청 */
  const deleteSelectionHandler = useCallback(() => {
    if (checkBoxes.length === 0) {
      alert('선택된 서점이 존재하지 않습니다.');
    } else {
      const sortedCheckboxes = [...checkBoxes];
      if (confirm(`${sortedCheckboxes.sort()}번 서점을 삭제 처리하시겠습니까?\n삭제한 서점은 저장되지 않습니다.`)) {
        // feature
        alert('현재 지원하지 않는 기능입니다.');
      }
    }
  }, [checkBoxes]);

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
          <ul>
            {bookstores && bookstores.map((bookstore) => {
              return (
                <li key={bookstore.id} className={checkBoxes.includes(bookstore.id) ? `${tableStyles.tr} ${tableStyles.checked}` : tableStyles.tr}>
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
                  <div className={styles.button}><button className={buttonStyles.status} onClick={changeStatusHandler(bookstore.id, bookstore.status)}>노출전환</button></div>
                  <div className={styles.button}><button className={buttonStyles.modification} onClick={moveToOtherPageHandler(`/bookstore/${bookstore.id}`)}>수정</button></div>
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
        <button className={buttonStyles.registration} onClick={moveToOtherPageHandler('/bookstore/registration')}>새 서점 등록</button>
        <button className={buttonStyles.removal} onClick={deleteSelectionHandler}>선택 서점 삭제</button>
      </div>
    </div>
  );
};

export default Management;