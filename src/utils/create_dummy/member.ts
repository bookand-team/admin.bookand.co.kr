import { faker } from '@faker-js/faker';

import { DeviceOSChoiceArr, MemberDisciplineReasonArr, MemberRoleArr, MemberStatusArr } from '@types';

export function CreateDummyMembers() {
  const createdDateList = faker.date.betweens('2021-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z', 300);
  createdDateList.sort((a, b) => a.getTime() - b.getTime());

  const data = createdDateList.map((CD, idx) => {
    const id = idx + 1;  // 식별값
    const name = faker.name.middleName();  // 이름
    const nickname = faker.internet.userName();  // 닉네임
    const email = faker.internet.email();  // 이메일
    const role = Math.random() < 0.95 ? MemberRoleArr[0] : MemberRoleArr[1];  // 역할
    const status = role === '관리자' ? MemberStatusArr[0] : MemberStatusArr[Math.floor(Math.random() * MemberStatusArr.length)];  // 이용 상태
    const deviceOS = DeviceOSChoiceArr[Math.floor(Math.random() * DeviceOSChoiceArr.length)];  // 사용 기종
    const bookmarkArticle = Math.floor(Math.random() * 30);  // 북마크한 아티클 수
    const bookmarkBookstore = Math.floor(Math.random() * 30);  // 북마크한 서점 수
    const createdDate = CD;  // 가입 날짜
    const accessedDate = Math.random() < 0.95 ? faker.date.between(CD, '2023-01-01T00:00:00.000Z') : null;  // 접속 날짜
    const withdrawalDate = status === '징계탈퇴' ? faker.date.between(CD, '2023-01-01T00:00:00.000Z') : null;  // 탈퇴 날짜
    const disciplineReason = (status === '징계정지' || status === '징계탈퇴') ? MemberDisciplineReasonArr[Math.floor(Math.random() * MemberDisciplineReasonArr.length)] : null;  // 징계 샤유

    return {
      id,
      name,
      nickname,
      email,
      role,
      status,
      deviceOS,
      bookmarkArticle,
      bookmarkBookstore,
      createdDate,
      accessedDate,
      withdrawalDate,
      disciplineReason
    };
  });

  return data;
}