export const MemberRoleArr = ['일반', '관리자'] as const;
export type MemberRole = typeof MemberRoleArr[number];

export const MemberRoleFilterArr = ['일반', '관리자', '전체'] as const;
export type MemberRoleFilter = typeof MemberRoleFilterArr[number];

export const MemberStatusArr = ['정상', '휴면', '징계정지', '징계탈퇴'] as const;
export type MemberStatus = typeof MemberStatusArr[number];

export const MemberDisciplineReasonArr = ['부적절한 언어 사용'] as const;
export type MemberDisciplineReason = typeof MemberDisciplineReasonArr[number];

export const MemberWithdrawalReasonArr = ['사용빈도', '콘텐츠', 'UI/UX', '시스템 에러', '개인정보', '기타'] as const;
export type MemberWithdrawalReason = typeof MemberWithdrawalReasonArr[number];

export interface MemberDTO {
  id: number;  // 식별자
  name: string;  // 이름
  nickname: string;  // 닉네임
  email: string;  // 이메일
  role: MemberRole;  // 역할
  status: MemberStatus;  // 이용 상태
  bookmarkArticle: number;  // 북마크한 아티클 수
  bookmarkBookstore: number;  // 북마크한 서점 수
  createdDate: string;  // 가입 날짜
  accessedDate: string | null;  // 접속 날짜
  withdrawalDate: string | null;  // 탈퇴 날짜
  disciplineReason: MemberDisciplineReason | null;  // 징계 사유
}

export interface MemberState {
  member: MemberDTO | null;

  members: MemberDTO[] | null;
  membersLength: number | null;
}