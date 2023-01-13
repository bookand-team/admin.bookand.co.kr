import { faker } from '@faker-js/faker';

import { ReportStatusArr } from '@types';

export function CreateDummyReports() {
  const createdDateList = faker.date.betweens('2021-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z', 300);
  createdDateList.sort((a, b) => a.getTime() - b.getTime());

  const data = createdDateList.map((CD, idx) => {
    const id = idx + 1;  // 식별자
    const bookstoreName = faker.company.name();  // 서점 이름
    const email = faker.internet.email();  // 이메일
    const status = ReportStatusArr[Math.floor(Math.random() * ReportStatusArr.length)];  // 노출 상태
    const reportedCount = Math.floor(Math.random() * 30);  // 제보요청 수
    const createdDate = CD;  // 등록 날짜
    const exposedDate = status === '노출' ? faker.date.between(CD, '2023-01-01T00:00:00.000Z') : null;  // 노출 날짜

    return {
      id,
      bookstoreName,
      email,
      status,
      reportedCount,
      createdDate,
      exposedDate
    };
  });

  return data;
}