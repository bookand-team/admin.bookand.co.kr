import { nanoid } from '@reduxjs/toolkit';
import { ReactNode, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useInputRadio, useInputSelect, useInputText, useInputTextArea } from '@hooks/use_input';
import { RootState } from '@redux/reducers';
import styles from '@styles/components/push/content.module.scss';
import { PushCategory, DeviceOSFilter, MemberIdFilter, MemberRoleFilter, MemberIdFilterArr, DeviceOSFilterArr, MemberRoleFilterArr, PushCategoryArr } from '@types';

type PropsType = {
  header: ReactNode;
  backBtnHandler: () => void;
};

const PushContent = ({ header, backBtnHandler }: PropsType) => {
  const { push } = useSelector((state: RootState) => state.push);

  // 입력받은 푸시 내용 (제목, 카테고리, 필터값, 본문)
  const [inputTitle, changeInputTitle] = useInputText(push?.title ? push.title : '');
  const [selectCategory, changeSelectCategory] = useInputSelect<'' | PushCategory>(push?.category ? push.category : '');
  const [selectMemberIdFilter, changeSelectMemberIdFilter] = useInputRadio<MemberIdFilter>(push?.filter?.memberId ? push.filter.memberId : '전체');
  const [selectDeviceOSFilter, changeSelectDeviceOSFilter] = useInputRadio<DeviceOSFilter>(push?.filter?.deviceOS ? push.filter.deviceOS : '전체');
  const [selectMemberRoleFilter, changeSelectMemberRoleFilter] = useInputRadio<MemberRoleFilter>(push?.filter?.memberRole ? push.filter.memberRole : '전체');
  const [inputContent, changeInputContent] = useInputTextArea(push?.content ? push.content : '');

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
      {header}
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
      <nav className={styles.buttons}>
        <button className={styles.back_btn} onClick={backBtnHandler}>뒤로가기</button>
        <button className={styles.submit_btn} onClick={submitBtnHandler}>저장하기</button>
      </nav>
    </section>
  );
};

export default PushContent;