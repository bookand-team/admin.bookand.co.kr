import { useRouter } from 'next/router';
import { useCallback } from 'react';

import useInput from '../../hooks/use_input';
import buttonStyles from '../../styles/layout/button.module.css';
import styles from '../../styles/push/modification.module.css';

const Registration = () => {
  const router = useRouter();

  // 입력받은 푸시 내용 (제목, 카테고리, 노출범위, 본문)
  const [inputTitle, changeInputTitle] = useInput('');
  const [selectCategory, changeSelectCategory] = useInput('');
  const [selectTargetMemberId, changeSelectTargetMemberId] = useInput('');
  const [selectTargetDevice, changeSelectTargetDevice] = useInput('');
  const [selectTargetMemberRole, changeSelectTargetMemberRole] = useInput('');
  const [inputContent, changeInputContent] = useInput('');

  /** 푸시 작성 취소 버튼 */
  const cancelRegistrationHandler = useCallback(() => {
    if (confirm('수정을 취소하면 수정 중인 PUSH는 저장되지 않습니다.\nPUSH 수정을 취소하시겠습니까?')) {
      router.push('/push');
    }
  }, []);

  /** 푸시 작성 완료 버튼 */
  const completeRegistrationHandler = useCallback(() => {
    if (inputTitle === '') {
      return alert('제목을 입력해주세요.');
    } else if (selectCategory === '') {
      return alert('카테고리를 선택해주세요.');
    } else if (selectTargetMemberId === '') {
      return alert('노출할 멤버 식별자 범위를 선택해주세요.');
    } else if (selectTargetDevice === '') {
      return alert('노출할 디바이스를 선택해주세요.');
    } else if (selectTargetMemberRole === '') {
      return alert('노출할 멤버 역할을 선택해주세요.');
    } else if (inputContent === '') {
      return alert('본문을 입력해주세요.');
    }
    // feature
    alert('현재 지원하지 않는 기능입니다.');
  }, [inputTitle, selectCategory, selectTargetMemberId, selectTargetDevice, selectTargetMemberRole, inputContent]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>PUSH 수정</h2>
      </div>
      <div className={styles.contents}>
        <div className={styles.title}>
          <input value={inputTitle} onChange={changeInputTitle} placeholder='제목을 입력해주세요.' />
        </div>
        <div className={styles.category}>
          <select value={selectCategory} onChange={changeSelectCategory}>
            <option value=''>카테고리</option>
            <option value='업데이트'>업데이트</option>
            <option value='에러'>에러</option>
            <option value='프로모션'>프로모션</option>
            <option value='기타'>기타</option>
          </select>
        </div>
        <div className={styles.target}>
          <div>
            <label><input type='radio' name='target_member_id' value='전체' onChange={changeSelectTargetMemberId} />전체</label>
            <label><input type='radio' name='target_member_id' value='홀수' onChange={changeSelectTargetMemberId} />ID값 홀수</label>
            <label><input type='radio' name='target_member_id' value='짝수' onChange={changeSelectTargetMemberId} />ID값 짝수</label>
          </div>
          <div>
            <label><input type='radio' name='target_device' value='전체' onChange={changeSelectTargetDevice} />전체</label>
            <label><input type='radio' name='target_device' value='Android' onChange={changeSelectTargetDevice} />Android</label>
            <label><input type='radio' name='target_device' value='IOS' onChange={changeSelectTargetDevice} />IOS</label>
          </div>
          <div>
            <label><input type='radio' name='target_member_role' value='전체' onChange={changeSelectTargetMemberRole} />전체</label>
            <label><input type='radio' name='target_member_role' value='일반' onChange={changeSelectTargetMemberRole} />일반</label>
            <label><input type='radio' name='target_member_role' value='관리자' onChange={changeSelectTargetMemberRole} />관리자</label>
          </div>

        </div>
        <div className={styles.content}>
          <textarea value={inputContent} onChange={changeInputContent} placeholder='본문을 입력해주세요.' />
        </div>
      </div>
      <div className={buttonStyles.buttons}>
        <button className={buttonStyles.cancellation} onClick={cancelRegistrationHandler}>수정취소</button>
        <button className={buttonStyles.completion} onClick={completeRegistrationHandler}>수정완료</button>
      </div>
    </div>
  );
};

export default Registration;