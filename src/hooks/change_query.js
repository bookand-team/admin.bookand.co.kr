/**
 * 현재 url의 query를 기반으로 특정 query만 추가/수정/제거하여 반환하는 함수
 * @param {object} query 현재 url query
 * @param {object} filter 추가/수정/제거하려는 url query
 * @returns {object} 추가/수정/제거된 url query
 */
const changeQuery = (query, filter) => {
  const newQuery = {};  // 이동할 url의 query

  // category
  if (filter.category) {
    newQuery.category = filter.category;
  } else if (filter.category !== '' && query.category) {
    newQuery.category = query.category;
  }

  // theme
  if (filter.theme) {
    newQuery.theme = filter.theme;
  } else if (filter.theme !== '' && query.theme) {
    newQuery.theme = query.theme;
  }

  // role
  if (filter.role) {
    newQuery.role = filter.role;
  } else if (filter.role !== '' && query.role) {
    newQuery.role = query.role;
  }

  // status
  if (filter.status) {
    newQuery.status = filter.status;
  } else if (filter.status !== '' && query.status) {
    newQuery.status = query.status;
  }

  // page
  if (filter.page && filter.page !== 1) {
    newQuery.page = filter.page;
  } else if (filter.page !== 1 && query.page && Number(query.page) !== 1) {
    newQuery.page = query.page;
  }

  // search
  if (filter.search) {
    newQuery.search = filter.search;
  } else if (filter.search !== '' && query.search) {
    newQuery.search = query.search;
  }

  return newQuery;
};

export default changeQuery;