import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';

import useInput from '../../hooks/use_input';
import styles from '../../styles/article/details.module.css';
import buttonStyles from '../../styles/layout/button.module.css';

const Details = () => {
  const router = useRouter();
  const { article } = useSelector((state) => state.article);

  // 입력받은 아티클 정보 (제목, 카테고리, 노출 디바이스, 노출 멤버 식별자, 본문)
  const [inputTitle, changeInputTitle] = useInput(article?.title ? article.title : '');
  const [selectCategory, changeSelectCategory] = useInput(article?.category ? article.category : '');
  const [selectTargetDevice, changeSelectTargetDevice] = useInput(article?.targetDevice ? article.targetDevice : '');
  const [selectTargetMemberId, changeSelectTargetMemberId] = useInput(article?.targetMemberId ? article.targetMemberId : '');
  const [inputContent, changeInputContent, setInputContent] = useInput(article?.content ? article.content : '');

  // 마크다운 형식의 아티클 본문
  const [markdownContent, setMarkdownContent] = useState('');

  // 선택자 (썸네일 이미지 선택 버튼, 이미지 url 생성 버튼, 아티클 본문 입력구역)
  const thumbnailImageRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  /** 이미지 가져오기 버튼 */
  const inputImageHandler = useCallback((ref) => () => {
    // TODO: 가져온 이미지 처리
    ref.current.click();
  }, []);

  /** 가져온 이미지 업로드 요청 */
  const uploadImageHandler = useCallback(async (event) => {
    // TODO: 가져온 이미지 처리
    if (event.target.files) {
      const formData = new FormData();
      formData.append('image', event.target.files[0]);
      alert('현재 지원하지 않는 기능입니다.');
    }
  }, []);

  /** 마크다운 형식의 줄바꿈으로 변환 */
  const convertEndOfLine = useCallback((inputContent) => {
    let markdown = inputContent.replace(/\n/g, '\n\n');
    markdown = markdown.replace(/\n\n\n\n/g, '\n\n&nbsp;\n\n');
    markdown = markdown.includes('\n\n\n\n') ? markdown.replace(/\n\n\n\n/g, '\n\n&nbsp;\n\n') : markdown;
    setMarkdownContent(markdown);
  }, []);

  /** 마크다운 형식의 진한 글씨체로 변환 */
  const convertBorder = useCallback(() => {
    if (contentRef.current) {
      const startLocation = contentRef.current.selectionStart;
      const endLocation = contentRef.current.selectionEnd;

      const changedText = contentRef.current.value.substring(0, startLocation) + '**' + contentRef.current.value.substring(startLocation, endLocation) + '**' + contentRef.current.value.substring(endLocation);
      setInputContent(changedText);
    }
  }, [contentRef]);

  /** 마크다운 형식의 기울임체로 변환 */
  const convertItalic = useCallback(() => {
    if (contentRef.current) {
      const startLocation = contentRef.current.selectionStart;
      const endLocation = contentRef.current.selectionEnd;

      const changedText = contentRef.current.value.substring(0, startLocation) + '*' + contentRef.current.value.substring(startLocation, endLocation) + '*' + contentRef.current.value.substring(endLocation);
      setInputContent(changedText);
    }
  }, [contentRef]);

  /** 뒤로가기 버튼 */
  const backBtnHandler = useCallback(() => {
    if (confirm('수정된 아티클 내용은 저장되지 않습니다.\n이전 페이지로 돌아가시겠습니까?')) {
      router.back();
    }
  }, []);

  /** 수정하기 버튼 */
  const submitBtnHandler = useCallback(() => {
    // TODO: 아티클 수정 버튼 기능 구현
    if (inputTitle === '') {
      return alert('아티클 제목을 입력해주세요.');
    } else if (selectCategory === '') {
      return alert('카테고리를 선택해주세요.');
    } else if (selectTargetDevice === '') {
      return alert('노출할 디바이스를 선택해주세요.');
    } else if (selectTargetMemberId === '') {
      return alert('노출할 멤버 식별자를 선택해주세요.');
    } else if (inputContent === '') {
      return alert('아티클 본문을 입력해주세요.');
    }
    alert('현재 지원하지 않는 기능입니다.');
  }, [inputTitle, selectCategory, selectTargetDevice, selectTargetMemberId, inputContent]);

  // 입력한 줄바꿈을 마크다운 줄바꿈으로 자동 변환
  useEffect(() => {
    convertEndOfLine(inputContent);
  }, [inputContent]);

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
          <button onClick={convertBorder}>진하게</button>
          <button onClick={convertItalic}>기울임</button>
          <input ref={imageRef} type='file' accept='image/*' hidden onChange={uploadImageHandler} />
          <button onClick={inputImageHandler(imageRef)}>이미지</button>
        </div>
        <div className={styles.workspace}>
          <div className={styles.edit_area}>
            <textarea ref={contentRef} value={inputContent} onChange={changeInputContent} placeholder='아티클 본문을 입력해주세요' />
          </div>
          <div className={styles.preview_area} >
            <ReactMarkdown >
              {markdownContent}
            </ReactMarkdown>
          </div>
        </div>
      </div>
      <div className={buttonStyles.buttons}>
        <button className={buttonStyles.cancellation} onClick={backBtnHandler}>돌아가기</button>
        <button className={buttonStyles.completion} onClick={submitBtnHandler}>수정하기</button>
      </div>
    </div>
  );
};

export default Details;