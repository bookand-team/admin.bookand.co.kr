/**
 * 불러온 데이터가 표 전체를 채울 수 있는지 확인
 * @param page 페이지 번호
 * @param tableRow 표 행 개수
 * @param contentsLength 전체 데이터 개수
 */
export const isRowInsufficient = (page: number | null, tableRow: number, contentsLength: number): boolean => {
  if ((page === null && contentsLength < tableRow) || (page === Math.floor((contentsLength - 1) / tableRow) + 1 && contentsLength < tableRow * page)) {
    return true;
  } else {
    return false;
  }
};

/**
 * 표를 채우기에 부족한 데이터 개수만큼 null로 채워진 배열 반환
 * @param page 페이지 번호
 * @param tableRow 표 행 개수
 * @param contentsLength 전체 데이터 개수
 */
export const makeEmptyArray = (page: number | null, tableRow: number, contentsLength: number): null[] => {
  const nullArray = [];
  if (page === null) {
    for (let i = 0; i < tableRow - contentsLength; i++) {
      nullArray.push(null);
    }
  } else {
    for (let i = 0; i < tableRow * page - contentsLength; i++) {
      nullArray.push(null);
    }
  }
  return nullArray;
};