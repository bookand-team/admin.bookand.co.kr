import { DeviceOSFilter, MemberIdFilter } from '../filter';
import { MemberRoleFilter } from '../member';

export const PushCategoryArr = ['업데이트', '에러', '프로모션', '홍보', '기타'] as const;
export type PushCategory = typeof PushCategoryArr[number];

export const PushStatusArr = ['전송전', '전송완료', '전송실패'] as const;
export type PushStatus = typeof PushStatusArr[number];

export interface PushDTO {
  id: number;  // 식별자
  title: string;  // 제목
  category: PushCategory;  // 유형 분류
  status: PushStatus;  // 전송 상태
  createdDate: string;  // 작성 날짜
  sentDate: string | null;  // 전송 날짜
  content: string;  // 내용
  writer: string;  // 작성자
  filter: {
    deviceOS: DeviceOSFilter;  // 디바이스 운영체제 필터값
    memberId: MemberIdFilter;  // 멤버 식별자 필터값
    memberRole: MemberRoleFilter;  // 멤버 역할 필터값
  };
}

export interface PushState {
  push: PushDTO | null;

  pushes: PushDTO[] | null;
  pushesLength: number | null;
}