import { nanoid } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { useInputRadio, useInputSelect, useInputText, useInputTextArea } from '@hooks/use_input';
import styles from '@styles/components/push/registration.module.scss';
import buttonStyles from '@styles/layout/button.module.scss';
import { PushCategory, DeviceOSFilter, MemberIdFilter, MemberRoleFilter, PushCategoryArr, MemberIdFilterArr, DeviceOSFilterArr, MemberRoleFilterArr } from '@types';

const Registration = () => {
  const router = useRouter();

  // 입력받은 푸시 내용 (제목, 카테고리, 필터값, 본문)
  const [inputTitle, changeInputTitle] = useInputText('');
  const [selectCategory, changeSelectCategory] = useInputSelect<'' | PushCategory>('');
  const [selectMemberIdFilter, changeSelectMemberIdFilter] = useInputRadio<MemberIdFilter>('전체');
  const [selectDeviceOSFilter, changeSelectDeviceOSFilter] = useInputRadio<DeviceOSFilter>('전체');
  const [selectMemberRoleFilter, changeSelectMemberRoleFilter] = useInputRadio<MemberRoleFilter>('전체');
  const [inputContent, changeInputContent] = useInputTextArea('');

  /** 뒤로가기 버튼 - 이전 페이지로 이동 */
  const backBtnHandler = useCallback(() => {
    if (confirm('작성을 취소하면 작성 중인 PUSH는 저장되지 않습니다.\nPUSH 작성을 취소하시겠습니까?')) {
      router.back();
    }
  }, []);

  /** 저장하기 버튼 - 수정사항 저장 요청 */
  const submitBtnHandler = useCallback(() => {
    // TODO: 수정사항 저장 요청 기능
    if (inputTitle === '') {
      return alert('제목을 입력해주세요.');
    } else if (selectCategory === '') {
      return alert('카테고리를 선택해주세요.');
    } else if (inputContent === '') {
      return alert('본문을 입력해주세요.');
    }
    alert('현재 지원하지 않는 기능입니다.');
  }, [inputTitle, selectCategory, selectMemberIdFilter, selectDeviceOSFilter, selectMemberRoleFilter, inputContent]);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>PUSH 등록</h2>
      </div>
      <div className={styles.contents}>
        <div className={styles.title}>
          <input value={inputTitle} onChange={changeInputTitle} placeholder='제목을 입력해주세요.' spellCheck='false' />
        </div>
        <div className={styles.category}>
          <select value={selectCategory} onChange={changeSelectCategory}>
            <option value='' disabled>카테고리</option>
            {PushCategoryArr.map((value) =>
              <option key={nanoid()} value={value}>{value}</option>
            )}
          </select>
        </div>
        <div className={styles.target}>
          <div>
            {MemberIdFilterArr.map((value, idx) =>
              <label key={`MIF${idx}`}><input type='radio' name='member id filter' value={value} onChange={changeSelectMemberIdFilter} />{value}</label>
            )}
          </div>
          <div>
            {DeviceOSFilterArr.map((value, idx) =>
              <label key={`DOF${idx}`}><input type='radio' name='device os filter' value={value} onChange={changeSelectDeviceOSFilter} />{value}</label>
            )}
          </div>
          <div>
            {MemberRoleFilterArr.map((value, idx) =>
              <label key={`MRF${idx}`}><input type='radio' name='member role filter' value={value} onChange={changeSelectMemberRoleFilter} />{value}</label>
            )}
          </div>
        </div>
        <div className={styles.content}>
          <textarea value={inputContent} onChange={changeInputContent} placeholder='본문을 입력해주세요.' spellCheck='false' />
        </div>
      </div>
      <div className={buttonStyles.buttons}>
        <button className={buttonStyles.back_btn} onClick={backBtnHandler}>뒤로가기</button>
        <button className={buttonStyles.submit_btn} onClick={submitBtnHandler}>저장하기</button>
      </div>
    </section>
  );
};

export default Registration;