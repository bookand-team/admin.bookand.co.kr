import { faker } from '@faker-js/faker';

import { DeviceOSChoiceArr, MemberWithdrawalReasonArr } from '@types';

export function createDummyWithdrawalMembers() {
  const withdrawalDateList = faker.date.betweens('2021-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z', 50);
  withdrawalDateList.sort((a, b) => a.getTime() - b.getTime());

  const data = withdrawalDateList.map((WD, idx) => {
    const id = idx + 1;  // 식별값
    const deviceOS = DeviceOSChoiceArr[Math.floor(Math.random() * DeviceOSChoiceArr.length)];  // 사용 기종
    const withdrawalReason = MemberWithdrawalReasonArr[Math.floor(Math.random() * MemberWithdrawalReasonArr.length)];  // 사용 기종
    const withdrawalDate = WD;  // 탈퇴 날짜

    return {
      id,
      deviceOS,
      withdrawalReason,
      withdrawalDate
    };
  });

  return data;
}