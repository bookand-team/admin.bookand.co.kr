import { BookstoreStatusKey, BookstoreStatusMapping, BookstoreStatusValue, BookstoreThemeKey, BookstoreThemeMapping, BookstoreThemeValue } from '@types';

/** 서점 테마 또는 노출 상태 key<->value 변환해 반환 */
export const convertBookstoreProperty = (property: 'theme' | 'status', data: BookstoreThemeKey | BookstoreThemeValue | BookstoreStatusKey | BookstoreStatusValue): BookstoreThemeKey | BookstoreThemeValue | BookstoreStatusKey | BookstoreStatusValue => {
  if (property === 'theme') {
    for (let keyword of BookstoreThemeMapping) {
      if (keyword.key === data) { return keyword.value; }
      else if (keyword.value === data) { return keyword.key; }
    }
  } else {
    for (let keyword of BookstoreStatusMapping) {
      if (keyword.key === data) { return keyword.value; }
      else if (keyword.value === data) { return keyword.key; }
    }
  }
  return data;
};