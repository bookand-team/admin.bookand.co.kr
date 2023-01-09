export type Feedback = {
  id: number;  // 식별자
  content?: string;  // 본문
  email?: string;  // 이메일
  category?: FeedbackCategory;  // 유형 분류
  device?: string;  // 디바이스 종류
  feedbackCount?: number;  // 조회수
  createdDate?: string;  // 작성 날짜
};

export type FeedbackCategory = '' | '정보오류' | '정보누락' | '업데이트' | '로그인' | '보안' | 'PUSH' | 'UI/UX' | '에러' | '기타';

export type FeedbackState = {
  feedback: Feedback | null;

  readFeedbackLoading: boolean;
  readFeedbackDone: unknown;
  readFeedbackError: unknown;
};

export type FeedbacksState = {
  feedbacks: Feedback[] | null;
  feedbacksLength: number | null;

  readFeedbacksLoading: boolean;
  readFeedbacksDone: unknown;
  readFeedbacksError: unknown;

  deleteFeedbacksLoading: boolean;
  deleteFeedbacksDone: unknown;
  deleteFeedbacksError: unknown;
};