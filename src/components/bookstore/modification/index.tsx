import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import BookstoreContent from '@components/bookstore/content';
import SectionHeader from '@components/common/header/section';

const BookstoreModification = () => {
  const router = useRouter();

  /** 뒤로가기 버튼 - 이전 페이지로 이동 */
  const backBtnHandler = useCallback(() => {
    if (confirm('서점 수정을 취소하면 변경사항은 저장되지 않습니다.\n서점 수정을 취소하시겠습니까?')) {
      router.back();
    }
  }, []);

  return <BookstoreContent header={<SectionHeader title='서점 수정' />} backBtnHandler={backBtnHandler} />;
};

export default BookstoreModification;