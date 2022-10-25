import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import getDisplayTime from '../../hooks/get_display_time';
import { isRowInsufficient, makeEmptyArray } from '../../hooks/maintain_table_layout';
import styles from '../../styles/bookstore/management.module.css';
import buttonStyles from '../../styles/layout/button.module.css';
import tableStyles from '../../styles/layout/table.module.css';
import Page from '../page';
import Search from '../search';

const Management = () => {
  const router = useRouter();
  const { bookstores, bookstoresLength } = useSelector((state) => state.bookstores);
  const { page } = useSelector((state) => state.page);

  const tableRow = 10;

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
              <div className={styles.id}>번호</div>
              <div className={styles.name}>서점명</div>
              <div className={styles.theme}>테마</div>
              <div className={styles.view}>누적뷰수</div>
              <div className={styles.bookmark}>북마크수</div>
              <div className={styles.status}>노출상태</div>
              <div className={styles.createdDate}>등록일자</div>
              <div className={styles.exposedDate}>노출일자</div>
              <div className={styles.modifiedDate}>최종 수정일자</div>
            </div>
          </div>
          <ul>
            {bookstores && bookstores.map((bookstore) => {
              return (
                <li key={bookstore.id} className={tableStyles.tr}>
                  <div className={styles.id}>{bookstore.id && bookstore.id}</div>
                  <div className={styles.name}>{bookstore.name && bookstore.name}</div>
                  <div className={styles.theme}>{bookstore.theme && bookstore.theme}</div>
                  <div className={styles.view}>{bookstore.view && bookstore.view}</div>
                  <div className={styles.bookmark}>{bookstore.bookmark && bookstore.bookmark}</div>
                  <div className={styles.status}>{bookstore.status && bookstore.status}</div>
                  <div className={styles.createdDate}>{bookstore.createdDate && getDisplayTime(bookstore.createdDate, 'yyyy-mm-dd hh:mm')}</div>
                  <div className={styles.exposedDate}>{bookstore.exposedDate && getDisplayTime(bookstore.exposedDate, 'yyyy-mm-dd hh:mm')}</div>
                  <div className={styles.modifiedDate}>{bookstore.modifiedDate && getDisplayTime(bookstore.modifiedDate, 'yyyy-mm-dd hh:mm')}</div>
                </li>
              );
            })}
            {isRowInsufficient(page, tableRow, bookstoresLength) && makeEmptyArray(page, tableRow, bookstoresLength).map((bookstore, idx) => {
              return (
                <li key={idx} className={tableStyles.tr}></li>
              );
            })}
          </ul>
        </div>
      </div>
      <Page tableRow={tableRow} contentsLength={bookstoresLength} />
      <div className={buttonStyles.buttons}>
        <button className={buttonStyles.registration} onClick={moveRegistration}>새 서점 등록</button>
        <button className={buttonStyles.removal}>선택 서점 삭제</button>
      </div>
    </div>
  );
};

export default Management;