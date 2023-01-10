export type Report = {
  id: number;  // 식별자
  bookstoreName?: string;  // 서점 이름
  email?: string;  // 이메일
  status?: ReportStatus;  // 노출 상태
  reportedCount: number;  // 제보요청 수
  createdDate?: string;  // 등록 날짜
  exposedDate?: string;  // 노출 날짜
};

export type ReportStatus = '' | '노출' | '미노출';

export type ReportState = {
  reports: Report[] | null;
  reportsLength: number | null;

  readReportsLoading: boolean;
  readReportsDone: unknown;
  readReportsError: unknown;
};