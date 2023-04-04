import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import BookstoreContent from '@components/bookstore/content';
import SectionHeader from '@components/common/header/section';

const BookstoreRegistration = () => {
  const router = useRouter();

  /** 뒤로가기 버튼 - 이전 페이지로 이동 */
  const backBtnHandler = useCallback(() => {
    if (confirm('서점 등록을 취소하면 등록 중인 서점은 저장되지 않습니다.\n서점 등록을 취소하시겠습니까?')) {
      router.back();
    }
  }, []);

  return <BookstoreContent header={<SectionHeader title='서점 등록' />} backBtnHandler={backBtnHandler} />;
};

export default BookstoreRegistration;