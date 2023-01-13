import { nanoid } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from '@components/common/modal';
import Page from '@components/common/page';
import Details from '@components/push/details';
import changeQuery from '@hooks/change_query';
import getDisplayTime from '@hooks/get_display_time';
import { isRowInsufficient, makeEmptyArray } from '@hooks/maintain_table_layout';
import multiCheckBoxHandler from '@hooks/multi_checkbox_handler';
import { useInputSelect } from '@hooks/use_input';
import { RootState } from '@redux/reducers';
import buttonStyles from '@styles/layout/button.module.css';
import tableStyles from '@styles/layout/table.module.css';
import styles from '@styles/push/management.module.css';
import { PushCategory, PushCategoryArr, PushStatus, PushStatusArr } from '@types';

const Management = () => {
  const router = useRouter();
  const { pushes, pushesLength } = useSelector((state: RootState) => state.pushes);
  const { page, row } = useSelector((state: RootState) => state.page);

  // checkbox 선택
  const [checkedBoxIds, checkBoxHandler] = multiCheckBoxHandler(page);

  // 선택한 데이터 (카테고리, 전송상태)
  const [selectCategory, changeSelectCategory] = useInputSelect<'' | PushCategory>('');
  const [selectStatus, changeSelectStatus] = useInputSelect<'' | PushStatus>('');

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

  /** 삭제 버튼 - 선택한 푸시 삭제 요청 */
  const deleteHandler = useCallback(() => {
    // TODO: 선택한 푸시 삭제 요청 기능
    if (checkedBoxIds.length === 0) {
      alert('선택된 PUSH가 존재하지 않습니다.');
    } else {
      const sortedCheckboxes = [...checkedBoxIds];
      if (confirm(`${sortedCheckboxes.sort()}번 PUSH를 삭제 처리하시겠습니까?\n삭제한 PUSH는 저장되지 않습니다.`)) {
        // feature
        alert('현재 지원하지 않는 기능입니다.');
      }
    }
  }, [checkedBoxIds]);

  useEffect(() => {
    const newQuery = changeQuery(router.query, { category: selectCategory, status: selectStatus });
    router.push({ pathname: router.pathname, query: newQuery });
  }, [selectCategory, selectStatus]);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>푸시 관리</h2>
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
                  {PushCategoryArr.map((value) =>
                    <option key={nanoid()} value={value}>{value}</option>
                  )}
                </select>
              </div>
              <div className={styles.status}>
                <select value={selectStatus} onChange={changeSelectStatus}>
                  <option value=''>전송상태</option>
                  {PushStatusArr.map((value) =>
                    <option key={nanoid()} value={value}>{value}</option>
                  )}
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
                <li key={push.id} className={checkedBoxIds.includes(push.id) ? `${tableStyles.tr} ${tableStyles.checked}` : tableStyles.tr}>
                  <div className={styles.check}>
                    <input type='checkbox' checked={checkedBoxIds.includes(push.id) ? true : false} onChange={(event) => checkBoxHandler(event.target.checked, push.id)} />
                  </div>
                  <div className={styles.id}>{push.id && push.id}</div>
                  <div className={styles.title}>{push.title && push.title}</div>
                  <div className={styles.category}>{push.category && push.category}</div>
                  <div className={styles.status}>{push.status && push.status}</div>
                  <div className={styles.createdDate}>{push.createdDate && getDisplayTime(push.createdDate, 'yyyy-mm-dd hh:mm')}</div>
                  <div className={styles.sentDate}>{push.sentDate && getDisplayTime(push.sentDate, 'yyyy-mm-dd hh:mm')}</div>
                  <div className={styles.button}>
                    <button className={buttonStyles.table_details_btn} onClick={detailsBtnHandler(push.id)}>상세정보</button>
                    <Modal id={push.id} openModalId={openModalId} setOpenModalId={setOpenModalId}>
                      <Details push={push} setOpenModalId={setOpenModalId} />
                    </Modal>
                  </div>
                  <div className={styles.button}><button className={buttonStyles.table_modify_btn} onClick={routePage(`/push/${push.id}`)}>수정</button></div>
                </li>
              );
            })}
            {pushesLength && isRowInsufficient(page, row, pushesLength) && makeEmptyArray(page, row, pushesLength).map((push, idx) => {
              return (
                <li key={idx} className={tableStyles.tr}></li>
              );
            })}
          </ul>
        </div>
      </div>
      {pushesLength ? <Page contentsLength={pushesLength} /> : null}
      <div className={buttonStyles.buttons}>
        <button className={buttonStyles.register_btn} onClick={routePage('/push/registration')}>새 푸시 생성</button>
        <button className={buttonStyles.delete_btn} onClick={deleteHandler}>선택 푸시 삭제</button>
      </div>
    </section>
  );
};

export default Management;