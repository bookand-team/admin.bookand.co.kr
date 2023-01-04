export type Member = {
  id: number;  // 식별자
  nickname?: string;  // 닉네임
  email?: string;  // 이메일
  role?: MemberRole;  // 역할
  status?: MemberStatus;  // 이용 상태
  createdDate?: string;  // 가입 날짜
  accessedDate?: string;  // 접속 날짜
  withdrawalDate?: string;  // 탈퇴 날짜
  bookmarkArticle?: number;  // 북마크한 아티클 수
  bookmarkBookstore?: number;  // 북마크한 서점 수
  name?: string;  // 이름
  disciplineReason?: string;  // 징계 사유
};

export type MemberRole = '' | '일반' | '관리자';
export type MemberStatus = '' | '정상' | '휴면' | '징계정지' | '징계탈퇴';

export type MemberState = {
  member: Member | null;

  readMemberLoading: boolean;
  readMemberDone: any;
  readMemberError: any;

  updateMemberLoading: boolean;
  updateMemberDone: any;
  updateMemberError: any;
};

export type MembersState = {
  members: Member[] | null;
  membersLength: number | null;

  readMembersLoading: boolean;
  readMembersDone: any;
  readMembersError: any;
};