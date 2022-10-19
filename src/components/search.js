import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import changeQuery from '../hooks/change_query';
import useInput from '../hooks/use_input';
import styles from '../styles/search.module.css';

const Search = ({ search: searchTarget }) => {
  const router = useRouter();
  const { search, page } = useSelector((state) => state.page);

  // 검색어
  const [searchText, changeSearchText] = useInput(search ? search : '');

  /**검색 요청 함수
   * 
   * 2자 이상의 검색어 입력 후 검색 시 검색 결과 페이지로 이동
   */
  const searchHandler = useCallback((event) => {
    event.preventDefault();

    // 검색 키워드는 2글자 이상으로만 가능
    if (searchText.length < 2) {
      return alert(`검색하실 내용을 2자 이상으로 검색해주세요.`);
    }

    // 검색 결과 페이지로 이동
    const newQuery = changeQuery(router, searchText, page);
    router.push(`${router.pathname}${newQuery}`);
  }, [searchText, router, search, page]);

  return (
    <form className={styles.container} onSubmit={searchHandler}>
      <div>
        <div>{searchTarget}</div>
        <input type='text' name='inputSearch' value={searchText} onChange={changeSearchText} />
      </div>
      <button type='submit'>검색</button>
    </form>
  );
};

export default Search;