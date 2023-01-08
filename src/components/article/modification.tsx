import React, { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';

import { useInputSelect, useInputText, useInputTextArea } from '@hooks/use_input';
import { RootState } from '@redux/reducers';
import styles from '@styles/article/modification.module.css';
import buttonStyles from '@styles/layout/button.module.css';
import { ArticleCategory, TargetDevice, TargetMemberId } from '@types';

const Modification = () => {
  const router = useRouter();
  const { article } = useSelector((state: RootState) => state.article);

  // 입력받은 아티클 정보 (제목, 카테고리, 노출 디바이스, 노출 멤버 식별자, 본문)
  const [inputTitle, changeInputTitle] = useInputText(article?.title ? article.title : '');
  const [selectCategory, changeSelectCategory] = useInputSelect<ArticleCategory>(article?.category ? article.category : '');
  const [selectTargetDevice, changeSelectTargetDevice] = useInputSelect<TargetDevice>(article?.targetDevice ? article.targetDevice : '');
  const [selectTargetMemberId, changeSelectTargetMemberId] = useInputSelect<TargetMemberId>(article?.targetMemberId ? article.targetMemberId : '');
  const [inputContent, changeInputContent, setInputContent] = useInputTextArea(article?.content ? article.content : '');

  // 마크다운 형식의 아티클 본문
  const [markdownContent, setMarkdownContent] = useState('');

  // 선택자 (썸네일 이미지 선택 버튼, 이미지 url 생성 버튼, 아티클 본문 입력구역)
  const thumbnailImageRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  /** 썸네일 이미지 선택 버튼, 이미지 버튼 - 파일 선택창 열기 */
  const openFileSelectionWindow = useCallback((ref: React.RefObject<HTMLInputElement>) => () => {
    ref.current?.click();
  }, []);

  /** 썸네일 이미지 선택 버튼 - 선택한 이미지 파일을 서버에 저장 요청 후, 받아온 이미지 파일의 url 저장 */
  const storeThumbnailImageUrl = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: 이미지 파일 서버 저장 요청
    if (e.target.files) {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      alert('현재 지원하지 않는 기능입니다.');
    }
  }, []);

  /** 이미지 버튼 - 선택한 이미지 파일을 서버에 저장 요청 후, 받아온 이미지 파일의 url 불러오기 */
  const getImageUrl = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: 이미지 파일 서버 저장 요청
    if (e.target.files) {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      alert('현재 지원하지 않는 기능입니다.');
    }
  }, []);

  /** 마크다운 형식의 줄바꿈으로 변환 */
  const convertEndOfLine = useCallback((inputContent: string) => {
    let markdown = inputContent.replace(/\n/g, '\n\n');
    markdown = markdown.replace(/\n\n\n\n/g, '\n\n&nbsp;\n\n');
    markdown = markdown.includes('\n\n\n\n') ? markdown.replace(/\n\n\n\n/g, '\n\n&nbsp;\n\n') : markdown;
    setMarkdownContent(markdown);
  }, []);

  /** 진하게 버튼 - 마크다운 형식의 진한 글씨체로 변환 */
  const convertBorder = useCallback(() => {
    if (contentRef.current) {
      const startLocation = contentRef.current.selectionStart;
      const endLocation = contentRef.current.selectionEnd;

      const changedText = contentRef.current.value.substring(0, startLocation) + '**' + contentRef.current.value.substring(startLocation, endLocation) + '**' + contentRef.current.value.substring(endLocation);
      setInputContent(changedText);
    }
  }, [contentRef]);

  /** 기울임 버튼 - 마크다운 형식의 기울임체로 변환 */
  const convertItalic = useCallback(() => {
    if (contentRef.current) {
      const startLocation = contentRef.current.selectionStart;
      const endLocation = contentRef.current.selectionEnd;

      const changedText = contentRef.current.value.substring(0, startLocation) + '*' + contentRef.current.value.substring(startLocation, endLocation) + '*' + contentRef.current.value.substring(endLocation);
      setInputContent(changedText);
    }
  }, [contentRef]);

  /** 뒤로가기 버튼 - 이전 페이지로 이동 */
  const backBtnHandler = useCallback(() => {
    if (confirm('수정된 아티클 내용은 저장되지 않습니다.\n이전 페이지로 돌아가시겠습니까?')) {
      router.back();
    }
  }, []);

  /** 저장하기 버튼 - 수정사항 저장 요청 */
  const submitBtnHandler = useCallback(() => {
    // TODO: 수정사항 저장 요청 기능
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
          <label>
            <input ref={thumbnailImageRef} type='file' accept='image/*' hidden onChange={(storeThumbnailImageUrl)} />
            <button onClick={openFileSelectionWindow(thumbnailImageRef)}>썸네일 이미지 선택</button>
          </label>
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
          <input ref={imageRef} type='file' accept='image/*' hidden onChange={getImageUrl} />
          <button onClick={openFileSelectionWindow(imageRef)}>이미지</button>
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
        <button className={buttonStyles.back_btn} onClick={backBtnHandler}>뒤로가기</button>
        <button className={buttonStyles.submit_btn} onClick={submitBtnHandler}>저장하기</button>
      </div>
    </div>
  );
};

export default Modification;