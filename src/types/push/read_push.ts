import { PushDTO } from './data';

export interface ReadPushResDTO {
  push: PushDTO;
}

export interface ReadPushesResDTO {
  pushes: PushDTO[];
  pushesLength: number;
}

export function isReadPushResDTO(res: unknown): res is ReadPushResDTO {
  // res가 객체인지 확인
  if (!(res !== null && typeof res === 'object')) { return false; }
  // push 확인
  if (!('push' in res)) { return false; }
  return true;
}

export function isReadPushesResDTO(res: unknown): res is ReadPushesResDTO {
  // res가 객체인지 확인
  if (!(res !== null && typeof res === 'object')) { return false; }
  // pushes, pushesLength 확인
  if (!('pushes' in res && 'pushesLength' in res)) { return false; }
  return true;
}