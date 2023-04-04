import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import SectionHeader from '@components/common/header/section';
import PushContent from '@components/push/content';

const PushRegistration = () => {
  const router = useRouter();

  /** 뒤로가기 버튼 - 이전 페이지로 이동 */
  const backBtnHandler = useCallback(() => {
    if (confirm('작성을 취소하면 작성 중인 PUSH는 저장되지 않습니다.\nPUSH 작성을 취소하시겠습니까?')) {
      router.back();
    }
  }, []);

  return <PushContent header={<SectionHeader title='푸시 등록' />} backBtnHandler={backBtnHandler} />;
};

export default PushRegistration;