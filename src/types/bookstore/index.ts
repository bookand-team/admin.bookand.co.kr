export type Bookstore = {
  id: number;  // 식별자
  name?: string;  // 이름
  theme?: BookstoreTheme;  // 테마
  status?: BookstoreStatus;  // 노출 상태
  view?: number;  // 조회수
  bookmark?: number;  // 북마크한 사람 수
  createdDate?: string;  // 작성 날짜
  exposedDate?: string;  // 공개 날짜
  modifiedDate?: string;  // 수정 날짜
  introduction?: string;  // 한줄 소개
  mainImage?: string;  // 대표 이미지
  subImages?: string[];  // 서브 이미지들
  contact?: string;  // 연락처
};

export type BookstoreTheme = '' | '여행' | '애완동물' | '역사' | '추리' | '그림' | '음악' | '영화';
export type BookstoreStatus = '' | '노출' | '미노출';

export type BookstoreState = {
  bookstore: Bookstore | null;

  createBookstoreLoading: boolean;
  createBookstoreDone: any;
  createBookstoreError: any;

  readBookstoreLoading: boolean;
  readBookstoreDone: any;
  readBookstoreError: any;

  updateBookstoreLoading: boolean;
  updateBookstoreDone: any;
  updateBookstoreError: any;

  deleteBookstoreLoading: boolean;
  deleteBookstoreDone: any;
  deleteBookstoreError: any;
};

export type BookstoresState = {
  bookstores: Bookstore[] | null;
  bookstoresLength: number | null;

  readBookstoresLoading: boolean;
  readBookstoresDone: any;
  readBookstoresError: any;

  deleteBookstoresLoading: boolean;
  deleteBookstoresDone: any;
  deleteBookstoresError: any;
};