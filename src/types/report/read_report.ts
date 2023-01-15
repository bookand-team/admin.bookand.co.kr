import { ReportDTO } from './data';

export interface ReadReportResDTO {
  report: ReportDTO;
}

export interface ReadReportsResDTO {
  reports: ReportDTO[];
  reportsLength: number;
}

export function isReadReportResDTO(res: unknown): res is ReadReportResDTO {
  // res가 객체인지 확인
  if (!(res !== null && typeof res === 'object')) { return false; }
  // report 확인
  if (!('report' in res)) { return false; }
  return true;
}

export function isReadReportsResDTO(res: unknown): res is ReadReportsResDTO {
  // res가 객체인지 확인
  if (!(res !== null && typeof res === 'object')) { return false; }
  // reports, reportsLength 확인
  if (!('reports' in res && 'reportsLength' in res)) { return false; }
  return true;
}