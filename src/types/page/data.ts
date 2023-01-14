import { ArticleCategory, ArticleStatus } from '../article';
import { BookstoreStatus, BookstoreTheme } from '../bookstore';
import { FeedbackCategory } from '../feedback';
import { MemberRole, MemberStatus } from '../member';
import { PushCategory, PushStatus } from '../push';
import { ReportStatus } from '../report';

export const GNBArr = [['dashboard', '대시보드'], ['article', '아티클'], ['bookstore', '서점'], ['member', '회원'], ['push', '푸시'], ['feedback', '피드백'], ['report', '서점 제보'], ['notice', '공지사항'], ['terms', '약관 및 정책']] as const;

export const PageSectionArr = ['login', 'dashboard', 'article', 'bookstore', 'member', 'push', 'feedback', 'report', 'notice', 'terms'] as const;
export type PageSection = typeof PageSectionArr[number];

export interface PageState {
  section: PageSection | null;
  category: ArticleCategory | FeedbackCategory | PushCategory | null;
  theme: BookstoreTheme | null;
  page: number;
  role: MemberRole | null;
  row: number;
  search: string | null;
  status: ArticleStatus | BookstoreStatus | MemberStatus | PushStatus | ReportStatus | null;
}

export interface PagePropsType {
  refreshToken: string;
}