import { DeviceOSFilter, MemberIdFilter } from '../filter';

export const ArticleCategoryArr = ['서점소개', '책소개', '인터뷰'] as const;
export type ArticleCategory = typeof ArticleCategoryArr[number];

export const ArticleStatusArr = ['노출', '미노출'] as const;
export type ArticleStatus = typeof ArticleStatusArr[number];

export interface ArticleDTO {
  id: number;  // 식별자
  title: string;  // 제목
  content: string;  // 본문
  category: ArticleCategory;  // 유형 분류
  writer: string;  // 작성자
  status: ArticleStatus;  // 노출 상태
  view: number;  // 조회수
  bookmark: number;  // 북마크한 사람 수
  createdDate: string;  // 작성 날짜
  exposedDate: string | null;  // 공개 날짜
  modifiedDate: string | null;  // 수정 날짜
  filter: {
    deviceOS: DeviceOSFilter;  // 디바이스 운영체제 필터값
    memberId: MemberIdFilter;  // 멤버 식별자 필터값
  };
}

export interface ArticleState {
  article: ArticleDTO | null;

  articles: ArticleDTO[] | null;
  articlesLength: number | null;
}