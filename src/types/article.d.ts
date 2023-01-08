import { TargetDevice, TargetMemberId } from './filter';

export type Article = {
  id: number;  // 식별자
  title?: string;  // 제목
  category?: ArticleCategory;  // 유형 분류
  status?: ArticleStatus;  // 노출 상태
  view?: number;  // 조회수
  bookmark?: number;  // 북마크한 사람 수
  createdDate?: string;  // 작성 날짜
  exposedDate?: string;  // 공개 날짜
  modifiedDate?: string;  // 수정 날짜
  targetDevice?: TargetDevice;  // 디바이스 필터값
  targetMemberId?: TargetMemberId;  // 멤버 식별자 필터값
  content?: string;  // 본문
  writer?: string;  // 작성자
};

export type ArticleCategory = '' | '서점소개' | '책소개' | '인터뷰';
export type ArticleStatus = '' | '노출' | '미노출';

export type ArticleState = {
  article: Article | null;

  createArticleLoading: boolean;
  createArticleDone: any;
  createArticleError: any;

  readArticleLoading: boolean;
  readArticleDone: any;
  readArticleError: any;

  updateArticleLoading: boolean;
  updateArticleDone: any;
  updateArticleError: any;

  deleteArticleLoading: boolean;
  deleteArticleDone: any;
  deleteArticleError: any;
};

export type ArticlesState = {
  articles: Article[] | null;
  articlesLength: number | null;

  readArticlesLoading: boolean;
  readArticlesDone: any;
  readArticlesError: any;

  deleteArticlesLoading: boolean;
  deleteArticlesDone: any;
  deleteArticlesError: any;
};