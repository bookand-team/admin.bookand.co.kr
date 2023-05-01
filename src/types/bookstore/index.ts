// 서점 테마
export const BookstoreThemeMapping = [
  { key: 'DETECTIVE', value: '추리' },
  { key: 'HISTORY', value: '역사' },
  { key: 'MOVIE', value: '영화' },
  { key: 'MUSIC', value: '음악' },
  { key: 'PET', value: '애완동물' },
  { key: 'PICTURE', value: '그림' },
  { key: 'TRAVEL', value: '여행' },
  { key: 'NONE', value: '' }
] as const;
export const BookstoreThemeKeyList = BookstoreThemeMapping.map((keyword) => keyword.key);
export const BookstoreThemeValueList = BookstoreThemeMapping.map((keyword) => keyword.value);
export type BookstoreThemeKey = typeof BookstoreThemeKeyList[number];
export type BookstoreThemeValue = typeof BookstoreThemeValueList[number];

// 서점 노출상태
export const BookstoreStatusMapping = [
  { key: 'VISIBLE', value: '노출' },
  { key: 'INVISIBLE', value: '미노출' }
] as const;
export const BookstoreStatusKeyList = BookstoreStatusMapping.map((keyword) => keyword.key);
export const BookstoreStatusValueList = BookstoreStatusMapping.map((keyword) => keyword.value);
export type BookstoreStatusKey = typeof BookstoreStatusKeyList[number];
export type BookstoreStatusValue = typeof BookstoreStatusValueList[number];

// 서점 등록 정보
export interface BookstoreProperty {
  address: string;  // 주소
  businessHours: string;  // 영업 시간
  contact: string;  // 전화 번호
  facility: string;  // 시설 정보
  latitude: string;  // 위도 정보
  longitude: string;  // 경도 정보
  sns: string;  // SNS 정보
}

// 서점 목록 조회 요청 파라미터
export interface ReadBookstoreListReqDTO {
  params: {
    page: number;  // 페이지 번호
    size?: number;  // 페이지당 공지시항 수 (default: 10)
    search: string;  // 검색어
    theme: BookstoreThemeKey | '';  // 테마
    status: BookstoreStatusKey | '';  // 노출상태
  };
  headers: {
    Authorization: string;  // 인증 토큰
  };
}

// 서점 조회 요청 파라미터
export interface ReadBookstoreReqDTO {
  bookstoreId: number;
  headers: {
    Authorization: string;  // 인증 토큰
  };
}

// 서점
export interface BookstoreDTO {
  id: number;  // 식별자
  name: string;  // 이름
  info: BookstoreProperty;  // api 등록 정보
  introduction: string;  // 한줄 소개
  theme: BookstoreThemeKey[];  // 테마
  themeList: BookstoreThemeKey[];  // 테마
  status: BookstoreStatusKey;  // 노출 상태
  view: number;  // 조회수
  isBookmark: boolean;
  createdDate: string;  // 작성 날짜
  modifiedDate: string;  // 수정 날짜
  displayDate: string;  // 공개 날짜
  mainImage: string;  // 대표 이미지 url
  subImage: {
    id: number;
    url: string;
    bookStore: string;
  }[];  // 서브 이미지 url들
  articleResponse: any;
  visibility: boolean;
  // bookmark: number;  // 북마크한 사람 수 (미지원)
}

// 서점 상태
export interface BookstoreState {
  bookstore: Omit<BookstoreDTO, 'theme'> | null;
  bookstoreList: {
    totalPages: number;
    totalElements: number;
    last: boolean;
    content: Omit<BookstoreDTO, 'themeList' | 'subImage' | 'isBookmark' | 'articleResponse'>[];
  } | null;

  // 서점 목록 조회
  readBookstoreListDone: boolean;
  readBookstoreListError: unknown;

  // 서점 조회
  readBookstoreDone: boolean;
  readBookstoreError: unknown;
}

export interface ReadBookstoreResDTO {
  bookstore: BookstoreDTO;
}

export interface ReadBookstoresResDTO {
  bookstores: BookstoreDTO[];
  bookstoresLength: number;
}

export function isReadBookstoreResDTO(res: unknown): res is ReadBookstoreResDTO {
  // res가 객체인지 확인
  if (!(res !== null && typeof res === 'object')) { return false; }
  // bookstore 확인
  if (!('bookstore' in res)) { return false; }
  return true;
}

export function isReadBookstoresResDTO(res: unknown): res is ReadBookstoresResDTO {
  // res가 객체인지 확인
  if (!(res !== null && typeof res === 'object')) { return false; }
  // bookstores, bookstoresLength 확인
  if (!('bookstores' in res && 'bookstoresLength' in res)) { return false; }
  return true;
}