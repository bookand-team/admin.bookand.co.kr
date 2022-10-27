import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import changeQuery from '../../hooks/change_query';
import getDisplayTime from '../../hooks/get_display_time';
import { isRowInsufficient, makeEmptyArray } from '../../hooks/maintain_table_layout';
import useCheckBoxes from '../../hooks/use_checkboxes';
import useInput from '../../hooks/use_input';
import styles from '../../styles/push/management.module.css';
import tableStyles from '../../styles/layout/table.module.css';
import Page from '../page';

const Management = () => {
  const router = useRouter();
  const { pushes, pushesLength } = useSelector((state) => state.pushes);
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>PUSH 관리</h2>
      </div>
      <div className={styles.contents}>
        <div className={tableStyles.table}>
          <div className={tableStyles.thead}>
            <div className={tableStyles.tr}>
              <div className={styles.check}>선택</div>
              <div className={styles.id}>번호</div>
              <div className={styles.title}>제목</div>
              <div className={styles.category}>
                <select value={selectCategory} onChange={changeSelectCategory}>
                  <option value=''>카테고리</option>
                  <option value='업데이트'>업데이트</option>
                  <option value='에러'>에러</option>
                  <option value='프로모션'>프로모션</option>
                  <option value='기타'>기타</option>
                </select>
              </div>
              <div className={styles.status}>
                <select value={selectStatus} onChange={changeSelectStatus}>
                  <option value=''>전송상태</option>
                  <option value='전송완료'>전송완료</option>
                  <option value='전송실패'>전송실패</option>
                  <option value='전송대기'>전송대기</option>
                </select>
              </div>
              <div className={styles.createdDate}>등록일자</div>
              <div className={styles.sentDate}>전송날짜</div>
            </div>
          </div>
          <ul>
            {pushes && pushes.map((push) => {
              return (
                <li key={push.id} className={tableStyles.tr}>
                  <div className={styles.check}>
                    <input type='checkbox' checked={checkBoxes.includes(push.id) ? true : false} onChange={(event) => checkBoxHandler(event.target.checked, push.id)} />
                  </div>
                  <div className={styles.id}>{push.id && push.id}</div>
                  <div className={styles.title}>{push.title && push.title}</div>
                  <div className={styles.category}>{push.category && push.category}</div>
                  <div className={styles.status}>{push.status && push.status}</div>
                  <div className={styles.createdDate}>{push.createdDate && getDisplayTime(push.createdDate, 'yyyy-mm-dd hh:mm')}</div>
                  <div className={styles.sentDate}>{push.sentDate && getDisplayTime(push.sentDate, 'yyyy-mm-dd hh:mm')}</div>
                </li>
              );
            })}
            {isRowInsufficient(page, row, pushesLength) && makeEmptyArray(page, row, pushesLength).map((push, idx) => {
              return (
                <li key={idx} className={tableStyles.tr}></li>
              );
            })}
          </ul>
        </div>
      </div>
      <Page tableRow={row} contentsLength={pushesLength} />
    </div>
  );
};

export default Management;