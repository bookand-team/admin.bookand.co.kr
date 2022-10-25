/**
 * 현재 page state를 고려하여 이동할 페이지의 query문을 생성 후 반환하는 함수
 * @param router next/router의 라우터
 * @param {object} filter 원하는 query의 key, value로 이루어진 객체
 * @returns {string} 이동 페이지 query문
 */
const changeQuery = (router, filter) => {
  let newQuery = '';  // 이동할 url의 query

  // page 변경
  if (filter.page) {
    if (newQuery) {
      newQuery += `&page=${filter.page}`;
    } else {
      newQuery += `page=${filter.page}`;
    }
  } else if (router.query.page) {
    if (newQuery) {
      newQuery += `&page=${router.query.page}`;
    } else {
      newQuery += `page=${router.query.page}`;
    }
  }

  // search 변경
  if (filter.search) {
    if (newQuery) {
      newQuery += `&search=${filter.search}`;
    } else {
      newQuery += `search=${filter.search}`;
    }
  } else if (router.query.search) {
    if (newQuery) {
      newQuery += `&search=${router.query.search}`;
    } else {
      newQuery += `search=${router.query.search}`;
    }
  }

  if (newQuery) {
    newQuery = '?' + newQuery;
  }

  return newQuery;
};

export default changeQuery;