import { MemberRole } from '../member';

export type TargetMemberId = '' | '홀수' | '짝수' | '전체';
export type TargetDevice = '' | 'Android' | 'IOS' | '전체';
export type TargetRole = MemberRole | '전체';