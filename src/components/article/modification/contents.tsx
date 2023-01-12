import Image from 'next/image';
import React, { useRouter } from 'next/router';
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

import imgIcon from '@images/image_icon.svg';
import styles from '@styles/article/contents.module.css';
import buttonStyles from '@styles/layout/button.module.css';

type PropsType = {
  inputTitle: string;
  changeInputTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  inputContent: string;
  changeInputContent: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  setInputContent: Dispatch<SetStateAction<string>>;
  markdownContent: string;
  setMarkdownContent: Dispatch<SetStateAction<string>>;
  setStage: Dispatch<SetStateAction<'contents' | 'extra contents'>>;
};

const Contents = ({ inputTitle, changeInputTitle, inputContent, changeInputContent, setInputContent, markdownContent, setMarkdownContent, setStage }: PropsType) => {
  const router = useRouter();

  // 선택자 (이미지 url 생성 버튼, 아티클 본문 입력구역)
  const inputImgFileRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  /** 마크다운 형식의 줄바꿈으로 변환 */
  const convertEndOfLine = useCallback((inputContent: string) => {
    let markdown = inputContent.replace(/\n/g, '\n\n');
    markdown = markdown.replace(/\n\n\n\n/g, '\n\n&nbsp;\n\n');
    markdown = markdown.includes('\n\n\n\n') ? markdown.replace(/\n\n\n\n/g, '\n\n&nbsp;\n\n') : markdown;
    setMarkdownContent(markdown);
  }, []);

  /** 헤더 버튼 */
  const headerBtnHandler = useCallback((header: 'h1' | 'h2' | 'h3' | 'h4') => () => {
    if (contentRef.current) {
      const endLocation = contentRef.current.selectionEnd;

      const additionalText = header === 'h1' ? '# ' : header === 'h2' ? '## ' : header === 'h3' ? '### ' : '#### ';
      const EOLLocation = inputContent.lastIndexOf('\n', endLocation - 1) + 1;

      let changedText = contentRef.current.value.substring(0, EOLLocation) + additionalText;
      if (contentRef.current.value.substring(EOLLocation, EOLLocation + 5) === '#### ') {
        changedText += contentRef.current.value.substring(EOLLocation + 5);
      } else if (contentRef.current.value.substring(EOLLocation, EOLLocation + 4) === '### ') {
        changedText += contentRef.current.value.substring(EOLLocation + 4);
      } else if (contentRef.current.value.substring(EOLLocation, EOLLocation + 3) === '## ') {
        changedText += contentRef.current.value.substring(EOLLocation + 3);
      } else if (contentRef.current.value.substring(EOLLocation, EOLLocation + 2) === '# ') {
        changedText += contentRef.current.value.substring(EOLLocation + 2);
      } else {
        changedText += contentRef.current.value.substring(EOLLocation);
      }
      setInputContent(changedText);
    }
  }, [inputContent, contentRef.current]);

  /** 진하게/기울임 버튼 */
  const styleBtnHandler = useCallback((style: 'bord' | 'italic') => () => {
    if (contentRef.current) {
      const startLocation = contentRef.current.selectionStart;
      const endLocation = contentRef.current.selectionEnd;

      const additionalText = style === 'bord' ? '**' : '*';
      let changedText: string;
      if (startLocation === endLocation) {
        changedText = contentRef.current.value.substring(0, startLocation) + additionalText + '텍스트' + additionalText + contentRef.current.value.substring(endLocation);
      } else {
        changedText = contentRef.current.value.substring(0, startLocation) + additionalText + contentRef.current.value.substring(startLocation, endLocation) + additionalText + contentRef.current.value.substring(endLocation);
      }
      setInputContent(changedText);
    }
  }, [inputContent, contentRef]);

  /** 이미지 버튼 - 파일 선택창 열기 */
  const openFileSelectionWindow = useCallback(() => {
    if (inputImgFileRef.current) {
      inputImgFileRef.current.click();
    }
  }, [inputImgFileRef.current]);

  /** (파일 선택창) 파일 선택 -> 선택 이미지 파일을 서버에 저장 후, 이미지 파일의 url 불러오기 */
  const getImageUrl = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: 이미지 파일 저장 및 url 요청
    if (e.target.files) {
      // const formData = new FormData();
      // formData.append('image', e.target.files[0]);
      alert('현재 지원하지 않는 기능입니다.');
    }
  }, []);

  /** 뒤로가기 버튼 - 이전 페이지로 이동 */
  const backBtnHandler = useCallback(() => {
    if (confirm('아티클 작성을 취소하면 작성 중인 아티클은 저장되지 않습니다.\n아티클 작성을 취소하시겠습니까?')) {
      router.back();
    }
  }, []);

  /** 저장하기 버튼 - 다음 단계로 이동 */
  const submitBtnHandler = useCallback(() => {
    setStage('extra contents');
  }, []);

  // 입력한 줄바꿈을 마크다운 줄바꿈으로 자동 변환
  useEffect(() => {
    convertEndOfLine(inputContent);
  }, [inputContent]);

  return (
    <div className={styles.container}>
      <section className={styles.editor}>
        <div className={styles.title}>
          <input value={inputTitle} onChange={changeInputTitle} placeholder='아티클 제목을 입력해주세요' />
        </div>
        <div className={styles.toolbar}>
          <div>
            <button onClick={headerBtnHandler('h1')}><span>H<span>1</span></span></button>
            <button onClick={headerBtnHandler('h2')}><span>H<span>2</span></span></button>
            <button onClick={headerBtnHandler('h3')}><span>H<span>3</span></span></button>
            <button onClick={headerBtnHandler('h4')}><span>H<span>4</span></span></button>
          </div>
          <div>
            <button onClick={styleBtnHandler('bord')}><span className={styles.bord}>B</span></button>
            <button onClick={styleBtnHandler('italic')}><span className={styles.italic}>I</span></button>
          </div>
          <div>
            <input ref={inputImgFileRef} type='file' accept='image/*' hidden onChange={getImageUrl} spellCheck='false' />
            <button onClick={openFileSelectionWindow}>
              <div className={styles.image}><Image src={imgIcon} alt='이미지 선택 버튼' width={20} height={20} /></div>
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <textarea ref={contentRef} value={inputContent} onChange={changeInputContent} placeholder='아티클 본문을 입력해주세요' spellCheck='false' />
        </div>
        <div className={buttonStyles.buttons}>
          <button className={buttonStyles.back_btn} onClick={backBtnHandler}>뒤로가기</button>
          <button className={buttonStyles.submit_btn} onClick={submitBtnHandler}>저장하기</button>
        </div>
      </section>
      <section className={styles.viewer}>
        {inputTitle &&
          <div className={styles.title_view}>
            <ReactMarkdown>
              {`# ${inputTitle}`}
            </ReactMarkdown>
          </div>
        }
        <div className={styles.content_view}>
          <ReactMarkdown>
            {markdownContent}
          </ReactMarkdown>
        </div>
      </section>
    </div>
  );
};

export default Contents;