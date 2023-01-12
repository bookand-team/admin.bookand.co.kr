import React from 'next/router';
import { useState } from 'react';

import Contents from './contents';
import ExtraContents from './extra_contents';
import { useInputText, useInputTextArea } from '@hooks/use_input';

const Registration = () => {
  const [stage, setStage] = useState<'contents' | 'extra contents'>('contents');

  // 입력받은 아티클 정보 (제목, 본문)
  const [inputTitle, changeInputTitle] = useInputText('');
  const [inputContent, changeInputContent, setInputContent] = useInputTextArea('');

  // 마크다운 형식의 아티클 내용
  const [markdownContent, setMarkdownContent] = useState('');

  return (
    <>
      {stage === 'contents' && <Contents
        inputTitle={inputTitle}
        changeInputTitle={changeInputTitle}
        inputContent={inputContent}
        changeInputContent={changeInputContent}
        setInputContent={setInputContent}
        markdownContent={markdownContent}
        setMarkdownContent={setMarkdownContent}
        setStage={setStage}
      />
      }
      {stage === 'extra contents' &&
        <ExtraContents setStage={setStage} />
      }
    </>
  );
};

export default Registration;