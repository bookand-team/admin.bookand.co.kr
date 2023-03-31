import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import changeQuery from '@hooks/change_query';
import { useInputText } from '@hooks/use_input';
import styles from '@styles/components/common/search.module.scss';
import buttonStyles from '@styles/layout/button.module.scss';

type Props = {
  search: string;
};

const Search = ({ search: searchTarget }: Props) => {
  const router = useRouter();

  // 검색어
  const [searchText, changeSearchText] = useInputText('');

  /** 입력된 검색어(2자 이상)를 검색 요청 */
  const searchHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 검색 키워드는 2글자 이상으로만 가능
    if (searchText.length < 2) {
      return alert(`검색하실 내용을 2자 이상으로 검색해주세요.`);
    }

    // 검색 결과 페이지로 이동
    const newQuery = changeQuery(router.query, { search: searchText });
    router.push({ pathname: router.pathname, query: newQuery });
  }, [searchText]);

  return (
    <form className={styles.container} onSubmit={searchHandler}>
      <div>
        <div>{searchTarget}</div>
        <input type='text' name='inputSearch' value={searchText} onChange={changeSearchText} spellCheck='false' />
      </div>
      <button className={buttonStyles.search} type='submit'>검색</button>
    </form>
  );
};

export default Search;