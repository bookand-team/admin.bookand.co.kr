/** 현재 페이지에서 불러온 데이터가 표를 다 채우지 못하는가? */
export const isRowInsufficient = (page, tableRow, contentsLength) => {
  if ((page === null && contentsLength < tableRow) || (page === parseInt((contentsLength - 1) / tableRow) + 1 && contentsLength < tableRow * page)) {
    return true;
  } else {
    return false;
  }
};

/** 데이터가 부족한 표의 행 수만큼 null로 채워진 배열 반환 */
export const makeEmptyArray = (page, tableRow, contentsLength) => {
  const ret = [];
  if (page === null) {
    for (var i = 0; i < tableRow - contentsLength; i++) {
      ret.push(null);
    }
  } else {
    for (var i = 0; i < tableRow * page - contentsLength; i++) {
      ret.push(null);
    }
  }
  return ret;
};