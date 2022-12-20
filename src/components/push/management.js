import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import changeQuery from '../../hooks/change_query';
import getDisplayTime from '../../hooks/get_display_time';
import { isRowInsufficient, makeEmptyArray } from '../../hooks/maintain_table_layout';
import useCheckBoxes from '../../hooks/use_checkboxes';
import useInput from '../../hooks/use_input';
import buttonStyles from '../../styles/layout/button.module.css';
import tableStyles from '../../styles/layout/table.module.css';
import styles from '../../styles/push/management.module.css';
import Page from '../page';

const Management = () => {
  const router = useRouter();
  const { pushes, pushesLength } = useSelector((state) => state.pushes);
  const { page, row } = useSelector((state) => state.page);

  // checkbox 선택
  const [checkBoxes, checkBoxHandler] = useCheckBoxes(page);

  // 선택한 데이터 (카테고리, 전송상태)
  const [selectCategory, changeSelectCategory] = useInput('');
  const [selectStatus, changeSelectStatus] = useInput('');

  /** status(전송상태) 변경 요청 */
  const changeStatusHandler = useCallback((id, status) => () => {
    if (status === '전송실패' && confirm('해당 PUSH를 재전송 처리하시겠습니까?\n전송 전 PUSH 정보를 꼼꼼히 확인해주세요.')) {
      // feature
      alert('현재 지원하지 않는 기능입니다.');
    } else if (status === '전송전' && confirm('해당 PUSH를 전송 처리하시겠습니까?\n전송 전 PUSH 정보를 꼼꼼히 확인해주세요.')) {
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
      alert('선택된 PUSH가 존재하지 않습니다.');
    } else {
      const sortedCheckboxes = [...checkBoxes];
      if (confirm(`${sortedCheckboxes.sort()}번 PUSH를 삭제 처리하시겠습니까?\n삭제한 PUSH는 저장되지 않습니다.`)) {
        // feature
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
              <div className={styles.button}></div>
              <div className={styles.button}></div>
            </div>
          </div>
          <ul className={tableStyles.tbody}>
            {pushes && pushes.map((push) => {
              return (
                <li key={push.id} className={checkBoxes.includes(push.id) ? `${tableStyles.tr} ${tableStyles.checked}` : tableStyles.tr}>
                  <div className={styles.check}>
                    <input type='checkbox' checked={checkBoxes.includes(push.id) ? true : false} onChange={(event) => checkBoxHandler(event.target.checked, push.id)} />
                  </div>
                  <div className={styles.id}>{push.id && push.id}</div>
                  <div className={styles.title}>{push.title && push.title}</div>
                  <div className={styles.category}>{push.category && push.category}</div>
                  <div className={styles.status}>{push.status && push.status}</div>
                  <div className={styles.createdDate}>{push.createdDate && getDisplayTime(push.createdDate, 'yyyy-mm-dd hh:mm')}</div>
                  <div className={styles.sentDate}>{push.sentDate && getDisplayTime(push.sentDate, 'yyyy-mm-dd hh:mm')}</div>
                  <div className={styles.button}><button className={buttonStyles.status} onClick={changeStatusHandler(push.id, push.status)}>{push.status && push.status === '전송전' ? '전송' : '재전송'}</button></div>
                  <div className={styles.button}><button className={buttonStyles.modification} onClick={moveToOtherPageHandler(`/push/${push.id}`)}>수정</button></div>
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
      <div className={buttonStyles.buttons}>
        <button className={buttonStyles.registration} onClick={moveToOtherPageHandler('/push/registration')}>새 푸시 작성</button>
        <button className={buttonStyles.removal} onClick={deleteSelectionHandler}>선택 푸시 삭제</button>
      </div>
    </div>
  );
};

export default Management;