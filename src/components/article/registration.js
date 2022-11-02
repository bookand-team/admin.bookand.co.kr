import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import useInput from '../../hooks/use_input';
import styles from '../../styles/article/registration.module.css';
import buttonStyles from '../../styles/layout/button.module.css';

const Registration = () => {
  const router = useRouter();

  // 입력받은 아티클 내용 (제목, 카테고리, 노출 디바이스, 노출 멤버 식별자, 본문)
  const [inputTitle, changeInputTitle] = useInput('');
  const [selectCategory, changeSelectCategory] = useInput('');
  const [selectTargetDevice, changeSelectTargetDevice] = useInput('');
  const [selectTargetMemberId, changeSelectTargetMemberId] = useInput('');
  const [inputText, changeInputText, setInputText] = useInput('');

  // 마크다운 형식의 아티클 내용
  const [viewText, setViewText] = useState('');

  // 선택자 (썸네일 이미지 생성 버튼, 아티클 본문, 아티클 본문 이미지 생성 버튼)
  const thumbnailImageRef = useRef(null);
  const textareaRef = useRef(null);
  const imageRef = useRef(null);

  // 아티클 본문 줄바꿈을 마크다운 줄바꿈으로 변환
  useEffect(() => {
    const markdown = inputText.replace(/\n/g, '\n\n');
    markdown = markdown.replace(/\n\n\n\n/g, '\n\n&nbsp;\n\n');
    markdown = markdown.includes('\n\n\n\n') ? markdown.replace(/\n\n\n\n/g, '\n\n&nbsp;\n\n') : markdown;
    setViewText(markdown);
  }, [inputText]);

  /** 선택한 글자 진하게 변환 */
  const borderHandler = useCallback(() => {
    if (textareaRef.current) {
      const startLocation = textareaRef.current.selectionStart;
      const endLocation = textareaRef.current.selectionEnd;

      const changedText = textareaRef.current.value.substring(0, startLocation) + '**' + textareaRef.current.value.substring(startLocation, endLocation) + '**' + textareaRef.current.value.substring(endLocation);
      setInputText(changedText);
    }
  }, [textareaRef]);

  /** 선택한 글자 기울임체로 변환 */
  const italicHandler = useCallback(() => {
    if (textareaRef.current) {
      const startLocation = textareaRef.current.selectionStart;
      const endLocation = textareaRef.current.selectionEnd;

      const changedText = textareaRef.current.value.substring(0, startLocation) + '*' + textareaRef.current.value.substring(startLocation, endLocation) + '*' + textareaRef.current.value.substring(endLocation);
      setInputText(changedText);
    }
  }, [textareaRef]);

  /** 이미지 가져오기 버튼 */
  const inputImageHandler = useCallback((ref) => () => {
    ref.current.click();
  }, []);

  /** 가져온 이미지 업로드 요청 */
  const uploadImageHandler = useCallback(async (event) => {
    if (event.target.files) {
      const formData = new FormData();
      formData.append('image', event.target.files[0]);
      // feature
      alert('현재 지원하지 않는 기능입니다.');
    }
  }, []);

  /** 아티클 작성 취소 버튼 */
  const cancelRegistrationHandler = useCallback(() => {
    if (confirm('아티클 작성을 취소하면 작성 중인 아티클은 저장되지 않습니다.\n아티클 작성을 취소하시겠습니까?')) {
      router.push('/article');
    }
  }, []);

  /** 아티클 작성 완료 버튼 */
  const completeRegistrationHandler = useCallback(() => {
    if (inputTitle === '') {
      return alert('아티클 제목을 입력해주세요.');
    } else if (selectCategory === '') {
      return alert('카테고리를 선택해주세요.');
    } else if (selectTargetDevice === '') {
      return alert('노출할 디바이스를 선택해주세요.');
    } else if (selectTargetMemberId === '') {
      return alert('노출할 멤버 식별자를 선택해주세요.');
    } else if (inputText === '') {
      return alert('아티클 본문을 입력해주세요.');
    }
    // feature
    alert('현재 지원하지 않는 기능입니다.');
  }, [inputTitle, selectCategory, selectTargetDevice, selectTargetMemberId, inputText]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <input type='textarea' value={inputTitle} onChange={changeInputTitle} placeholder='아티클 제목을 입력해주세요' />
        </div>
        <div>
          <input ref={thumbnailImageRef} type='file' accept='image/*' hidden onChange={uploadImageHandler} />
          <button onClick={inputImageHandler(thumbnailImageRef)}>썸네일 이미지 선택</button>
        </div>
        <div className={styles.select_area}>
          <div>
            <select value={selectCategory} onChange={changeSelectCategory}>
              <option value=''>카테고리</option>
              <option value='서점소개'>서점소개</option>
              <option value='책소개'>책소개</option>
              <option value='인터뷰'>인터뷰</option>
            </select>
          </div>
          <div>
            <select value={selectTargetDevice} onChange={changeSelectTargetDevice}>
              <option value=''>Device</option>
              <option value='전체'>전체</option>
              <option value='Android'>Android</option>
              <option value='IOS'>IOS</option>
            </select>
          </div>
          <div>
            <select value={selectTargetMemberId} onChange={changeSelectTargetMemberId}>
              <option value=''>Member ID</option>
              <option value='전체'>전체</option>
              <option value='홀수'>홀수</option>
              <option value='짝수'>짝수</option>
            </select>
          </div>
        </div>
      </div>
      <div className={styles.editor}>
        <div className={styles.handler}>
          <button onClick={borderHandler}>진하게</button>
          <button onClick={italicHandler}>기울임</button>
          <input ref={imageRef} type='file' accept='image/*' hidden onChange={uploadImageHandler} />
          <button onClick={inputImageHandler(imageRef)}>이미지</button>
        </div>
        <div className={styles.workspace}>
          <div className={styles.edit_area}>
            <textarea ref={textareaRef} value={inputText} onChange={changeInputText} placeholder='아티클 본문을 입력해주세요' />
          </div>
          <div className={styles.preview_area}>
            <ReactMarkdown children={viewText} />
          </div>
        </div>
      </div>
      <div className={buttonStyles.buttons}>
        <button className={buttonStyles.cancellation} onClick={cancelRegistrationHandler}>작성취소</button>
        <button className={buttonStyles.completion} onClick={completeRegistrationHandler}>작성완료</button>
      </div>
    </div>
  );
};

export default Registration;