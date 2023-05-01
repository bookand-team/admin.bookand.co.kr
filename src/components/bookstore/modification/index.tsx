import BookstoreContent from '@components/bookstore/content';
import SectionHeader from '@components/common/header/section';

const BookstoreModification = () => {
  return <BookstoreContent header={<SectionHeader title='서점 수정' />}
    submit_btn_name='적용하기'
    delete_btn_name='삭제하기'
  />;
};

export default BookstoreModification;