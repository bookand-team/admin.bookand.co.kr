import { BookstoreDTO } from './data';

export interface ReadBookstoreResDTO {
  bookstore: BookstoreDTO;
}

export interface ReadBookstoresResDTO {
  bookstores: BookstoreDTO[];
  bookstoresLength: number;
}

export function isReadBookstoreResDTO(res: unknown): res is ReadBookstoreResDTO {
  // res가 객체인지 확인
  if (!(res !== null && typeof res === 'object')) { return false; }
  // bookstore 확인
  if (!('bookstore' in res)) { return false; }
  return true;
}

export function isReadBookstoresResDTO(res: unknown): res is ReadBookstoresResDTO {
  // res가 객체인지 확인
  if (!(res !== null && typeof res === 'object')) { return false; }
  // bookstores, bookstoresLength 확인
  if (!('bookstores' in res && 'bookstoresLength' in res)) { return false; }
  return true;
}