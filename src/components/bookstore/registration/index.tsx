import BookstoreContent from '@components/bookstore/content';
import SectionHeader from '@components/common/header/section';

const BookstoreRegistration = () => {
  return <BookstoreContent
    header={<SectionHeader title='서점 등록' />}
    submit_btn_name='등록하기'
    delete_btn_name='작성취소'
  />;
};

export default BookstoreRegistration;