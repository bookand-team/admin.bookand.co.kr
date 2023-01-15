import { FeedbackDTO } from './data';

export interface ReadFeedbackResDTO {
  feedback: FeedbackDTO;
}

export interface ReadFeedbacksResDTO {
  feedbacks: FeedbackDTO[];
  feedbacksLength: number;
}

export function isReadFeedbackResDTO(res: unknown): res is ReadFeedbackResDTO {
  // res가 객체인지 확인
  if (!(res !== null && typeof res === 'object')) { return false; }
  // feedback 확인
  if (!('feedback' in res)) { return false; }
  return true;
}

export function isReadFeedbacksResDTO(res: unknown): res is ReadFeedbacksResDTO {
  // res가 객체인지 확인
  if (!(res !== null && typeof res === 'object')) { return false; }
  // feedbacks, feedbacksLength 확인
  if (!('feedbacks' in res && 'feedbacksLength' in res)) { return false; }
  return true;
}