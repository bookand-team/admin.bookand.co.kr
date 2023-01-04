type Query = {
  category?: string;
  theme?: string;
  role?: string;
  status?: string;
  page?: number;
  search?: string;
};

/**
 * 현재 url의 query를 기반으로 특정 query만 추가/수정/제거하여 반환하는 함수
 * @param currentQuery 현재 url query
 * @param changePart 추가/수정/제거하려는 url query
 * @returns 추가/수정/제거된 url query
 */
const changeQuery = <T extends Query>(currentQuery: T, changePart: Query): Query => {
  const changedQuery: Query = {};  // 이동할 url의 query

  // category
  if (changePart.category) {
    changedQuery.category = changePart.category;
  } else if (changePart.category !== '' && currentQuery.category) {
    changedQuery.category = currentQuery.category;
  }

  // theme
  if (changePart.theme) {
    changedQuery.theme = changePart.theme;
  } else if (changePart.theme !== '' && currentQuery.theme) {
    changedQuery.theme = currentQuery.theme;
  }

  // role
  if (changePart.role) {
    changedQuery.role = changePart.role;
  } else if (changePart.role !== '' && currentQuery.role) {
    changedQuery.role = currentQuery.role;
  }

  // status
  if (changePart.status) {
    changedQuery.status = changePart.status;
  } else if (changePart.status !== '' && currentQuery.status) {
    changedQuery.status = currentQuery.status;
  }

  // page
  if (changePart.page && changePart.page !== 1) {
    changedQuery.page = changePart.page;
  } else if (changePart.page !== 1 && currentQuery.page && Number(currentQuery.page) !== 1) {
    changedQuery.page = Number(currentQuery.page);
  }

  // search
  if (changePart.search) {
    changedQuery.search = changePart.search;
  } else if (changePart.search !== '' && currentQuery.search) {
    changedQuery.search = currentQuery.search;
  }

  return changedQuery;
};

export default changeQuery;