import { MemberDTO } from './data';

export interface ReadMemberResDTO {
  member: MemberDTO;
}

export interface ReadMembersResDTO {
  members: MemberDTO[];
  membersLength: number;
}

export function isReadMemberResDTO(res: unknown): res is ReadMemberResDTO {
  // res가 객체인지 확인
  if (!(res !== null && typeof res === 'object')) { return false; }
  // member 확인
  if (!('member' in res)) { return false; }
  return true;
}

export function isReadMembersResDTO(res: unknown): res is ReadMembersResDTO {
  // res가 객체인지 확인
  if (!(res !== null && typeof res === 'object')) { return false; }
  // members, membersLength 확인
  if (!('members' in res && 'membersLength' in res)) { return false; }
  return true;
}