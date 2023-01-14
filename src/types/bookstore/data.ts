export const BookstoreThemeArr = ['여행', '음악', '그림', '애완동물', '영화', '추리', '역사'] as const;
export type BookstoreTheme = typeof BookstoreThemeArr[number];

export const BookstoreStatusArr = ['노출', '미노출'] as const;
export type BookstoreStatus = typeof BookstoreStatusArr[number];

export interface BookstoreDTO {
  id: number;  // 식별자
  name: string;  // 이름
  info: {  // api 등록 정보
    address: string | null;  // 주소
    businessHours: string | null;  // 영업 시간
    contact: string | null;  // 전화 번호
    facility: string | null;  // 시설 정보
    sns: string | null;  // SNS(인스타)
  };
  theme: BookstoreTheme;  // 테마
  introduction: string;  // 한줄 소개
  mainImage: string | null;  // 대표 이미지
  subImages: string[] | null;  // 서브 이미지들
  status: BookstoreStatus;  // 노출 상태
  view: number;  // 조회수
  bookmark: number;  // 북마크한 사람 수
  createdDate: string;  // 작성 날짜
  exposedDate: string | null;  // 공개 날짜
  modifiedDate: string | null;  // 수정 날짜
}

export interface BookstoreState {
  bookstore: BookstoreDTO | null;

  bookstores: BookstoreDTO[] | null;
  bookstoresLength: number | null;
}