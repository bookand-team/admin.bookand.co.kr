import { DeviceOSChoice } from '../filter';

export const FeedbackCategoryArr = ['정보오류', '정보누락', '업데이트', '로그인', '보안', 'PUSH', 'UI/UX', '에러', '기타'] as const;
export type FeedbackCategory = typeof FeedbackCategoryArr[number];

export interface FeedbackDTO {
  id: number;  // 식별자
  category: FeedbackCategory;  // 유형 분류
  content: string;  // 내용
  score: number;  // 평점(별점)
  createdDate: string;  // 작성 날짜
  email: string;  // 이메일
  deviceOS: DeviceOSChoice;  // 디바이스 운영체제
}

export interface FeedbackState {
  feedback: FeedbackDTO | null;

  feedbacks: FeedbackDTO[] | null;
  feedbacksLength: number | null;
}