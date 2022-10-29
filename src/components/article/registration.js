import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useDispatch } from 'react-redux';

import useInput from '../../hooks/use_input';
import { postArticle } from '../../redux/actions/article';
import styles from '../../styles/article/registration.module.css';
import buttonStyles from '../../styles/layout/button.module.css';

const Registration = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // 입력받은 아티클 내용 (제목, 카테고리, 본문)
  const [inputTitle, changeInputTitle] = useInput('');
  const [selectCategory, changeSelectCategory] = useInput('');
  const [inputText, changeInputText, setInputText] = useInput(`마크다운 작성 미리보기\n\n# 제목1\n## 제목2\n### 제목3\n#### 제목4\n\n기본적인 글\n**진하게** 표시된 글\n*기울여진* 글\n***진하게 + 기울여진*** 글\n\n![logo](https://user-images.githubusercontent.com/79047370/198820062-19addd6b-2a80-487a-800e-c5a0ef51bb6a.png)`);

  const textareaRef = useRef(null);
  const imageRef = useRef(null);

  // 마크다운 형식의 아티클 내용
  const [viewText, setViewText] = useState('');

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
  const inputImageHandler = useCallback(() => {
    imageRef.current.click();
  }, [imageRef.current]);

  /** 가져온 이미지 업로드 요청 */
  const uploadImageHandler = useCallback(async (event) => {
    if (event.target.files) {
      const formData = new FormData();
      formData.append('image', event.target.files[0]);
      try {
        const response = await axios.post('/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        console.log(response.data);  // 미완성 (서버 설계 완료된 후에 작업예정)
      } catch (error) {
        console.log(error.response.data);  // 미완성 (서버 설계 완료된 후에 작업예정)
      }
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
    dispatch(postArticle({

    }));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <input type='textarea' value={inputTitle} onChange={changeInputTitle} placeholder='아티클 제목' />
        </div>
        <div className={styles.category}>
          <select value={selectCategory} onChange={changeSelectCategory}>
            <option value=''>카테고리</option>
            <option value='서점소개'>서점소개</option>
            <option value='책소개'>책소개</option>
            <option value='인터뷰'>인터뷰</option>
          </select>
        </div>
      </div>
      <div className={styles.editor}>
        <div className={styles.handler}>
          <button onClick={borderHandler}>진하게</button>
          <button onClick={italicHandler}>기울임</button>
          <input ref={imageRef} type='file' accept='image/*' hidden onChange={uploadImageHandler} />
          <button onClick={inputImageHandler}>이미지</button>
        </div>
        <div className={styles.workspace}>
          <div className={styles.edit_area}>
            <textarea ref={textareaRef} value={inputText} onChange={changeInputText} />
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