/**
 * 현재 page state를 고려하여 이동할 페이지의 query문을 생성 후 반환하는 함수
 * @param router next/router의 라우터
 * @param {string} newSearch 이동 페이지 search값
 * @param {number | null} newPage 이동 페이지 page값
 * @returns {string} 이동 페이지 query문
 */
const changeQuery = (router, newSearch = router.query.search, newPage = router.query.page) => {
  let newQuery = '';  // 이동할 url의 query
  // search 변경
  if (newSearch) {
    newQuery += `search=${newSearch}`;
  }
  // page 변경
  if (newPage) {
    if (newQuery) {
      newQuery += `&page=${newPage}`;
    } else {
      newQuery += `page=${newPage}`;
    }
  }

  if (newQuery) {
    newQuery = '?' + newQuery;
  }

  return newQuery;
};

export default changeQuery;