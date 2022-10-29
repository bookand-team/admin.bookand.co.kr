import { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import useInput from '../../hooks/use_input';
import styles from '../../styles/article/registration.module.css';

const Registration = () => {
  const textRef = useRef(null);
  const [inputText, changeInputText, setInputText] = useInput(`마크다운 작성 미리보기\n\n# 제목1\n## 제목2\n### 제목3\n#### 제목4\n\n기본적인 글\n**진하게** 표시된 글\n*기울여진* 글\n***진하게 + 기울여진*** 글\n\n![logo](https://user-images.githubusercontent.com/79047370/198820062-19addd6b-2a80-487a-800e-c5a0ef51bb6a.png)`);
  const [viewText, setViewText] = useState('');

  // 입력 텍스트 줄바꿈을 마크다운 줄바꿈으로 변환
  useEffect(() => {
    const markdown = inputText.replace(/\n/g, '\n\n');
    markdown = markdown.replace(/\n\n\n\n/g, '\n\n&nbsp;\n\n');
    markdown = markdown.includes('\n\n\n\n') ? markdown.replace(/\n\n\n\n/g, '\n\n&nbsp;\n\n') : markdown;
    setViewText(markdown);
  }, [inputText]);

  /** 선택한 글자 진하게 변환 */
  const borderHandler = useCallback(() => {
    if (textRef.current) {
      const startLocation = textRef.current.selectionStart;
      const endLocation = textRef.current.selectionEnd;

      const changedText = textRef.current.value.substring(0, startLocation) + '**' + textRef.current.value.substring(startLocation, endLocation) + '**' + textRef.current.value.substring(endLocation);
      setInputText(changedText);
    }
  }, [textRef]);

  /** 선택한 글자 기울임체로 변환 */
  const italicHandler = useCallback(() => {
    if (textRef.current) {
      const startLocation = textRef.current.selectionStart;
      const endLocation = textRef.current.selectionEnd;

      const changedText = textRef.current.value.substring(0, startLocation) + '*' + textRef.current.value.substring(startLocation, endLocation) + '*' + textRef.current.value.substring(endLocation);
      setInputText(changedText);
    }
  }, [textRef]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>아티클 등록</h2>
      </div>
      <div className={styles.contents}>
        <div className={styles.handler}>
          <button onClick={borderHandler}>진하게</button>
          <button onClick={italicHandler}>기울임</button>
        </div>
        <div className={styles.workspace}>
          <div className={styles.editor}>
            <textarea ref={textRef} value={inputText} onChange={changeInputText} />
          </div>
          <div className={styles.preview}>
            <ReactMarkdown children={viewText} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Registration;