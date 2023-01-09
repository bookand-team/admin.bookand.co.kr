import { TargetDevice, TargetMemberId, TargetRole } from '../filter';

export type Push = {
  id: number;  // 식별자
  title?: string;  // 제목
  category?: PushCategory;  // 유형 분류
  status?: PushStatus;  // 전송 상태
  createdDate?: string;  // 가입 날짜
  sentDate?: string;  // 전송 날짜
  targetMemberId?: TargetMemberId;  // 멤버 식별자 필터값
  targetDevice?: TargetDevice;  // 디바이스 필터값
  targetMemberRole?: TargetRole;  // 멤버 역할 필터값
  content?: string;  // 본문
  writer?: string;  // 작성자
};

export type PushCategory = '' | '업데이트' | '에러' | '프로모션' | '홍보' | '기타';
export type PushStatus = '' | '전송전' | '전송완료' | '전송실패' | '전송대기';

export type PushState = {
  push: Push | null;

  createPushLoading: boolean;
  createPushDone: any;
  createPushError: any;

  readPushLoading: boolean;
  readPushDone: any;
  readPushError: any;

  updatePushLoading: boolean;
  updatePushDone: any;
  updatePushError: any;

  deletePushLoading: boolean;
  deletePushDone: any;
  deletePushError: any;
};

export type PushesState = {
  pushes: Push[] | null;
  pushesLength: number | null;

  readPushesLoading: boolean;
  readPushesDone: any;
  readPushesError: any;

  deletePushesLoading: boolean;
  deletePushesDone: any;
  deletePushesError: any;
};