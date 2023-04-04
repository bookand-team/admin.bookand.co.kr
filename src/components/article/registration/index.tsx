import React from 'next/router';
import { useEffect, useState } from 'react';

import ArticleContent from '@components/article/content';
import ArticleExtraContent from '@components/article/extra_content';

const ArticleRegistration = () => {
  // 페이지 단계 및 내용
  const [stage, setStage] = useState<'content' | 'extra content'>('content');
  const [content, setContent] = useState(<></>);

  useEffect(() => {
    switch (stage) {
      case 'content':
        setContent(<ArticleContent setStage={setStage} />);
        break;
      case 'extra content':
        setContent(<ArticleExtraContent setStage={setStage} />);
        break;
    }
  }, [stage]);

  return content;
};

export default ArticleRegistration;