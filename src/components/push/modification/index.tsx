import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import SectionHeader from '@components/common/header/section';
import PushContent from '@components/push/content';

const PushModification = () => {
  const router = useRouter();

  /** 뒤로가기 버튼 - 이전 페이지로 이동 */
  const backBtnHandler = useCallback(() => {
    if (confirm('수정을 취소하면 수정 중인 PUSH는 저장되지 않습니다.\nPUSH 수정을 취소하시겠습니까?')) {
      router.back();
    }
  }, []);

  return <PushContent header={<SectionHeader title='푸시 수정' />} backBtnHandler={backBtnHandler} />;
};

export default PushModification;