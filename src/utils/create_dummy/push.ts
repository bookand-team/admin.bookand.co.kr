import { faker } from '@faker-js/faker';

import { DeviceOSFilterArr, MemberIdFilterArr, MemberRoleFilterArr, PushCategoryArr, PushStatusArr } from '@types';

export function CreateDummyPushs() {
  const createdDateList = faker.date.betweens('2021-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z', 300);
  createdDateList.sort((a, b) => a.getTime() - b.getTime());

  const data = createdDateList.map((CD, idx) => {
    const id = idx + 1;  // 식별값
    const title = faker.lorem.sentence();  // 제목
    const category = PushCategoryArr[Math.floor(Math.random() * PushCategoryArr.length)];  // 유형 분류
    const status = Math.random() < 0.1 ? PushStatusArr[0] : Math.random() < 0.9 ? PushStatusArr[1] : PushStatusArr[2];  // 전송 상태
    const createdDate = CD;  // 작성 날짜
    const sentDate = status !== '전송전' ? faker.date.between(CD, '2023-01-01T00:00:00.000Z') : null;  // 전송 날짜
    const content = faker.lorem.paragraph();  // 내용
    const writer = faker.name.middleName();  // 작성자
    const filter = {
      deviceOS: DeviceOSFilterArr[Math.floor(Math.random() * DeviceOSFilterArr.length)], // 디바이스 운영체제 필터값
      memberId: MemberIdFilterArr[Math.floor(Math.random() * MemberIdFilterArr.length)],  // 멤버 식별자 필터값
      memberRole: MemberRoleFilterArr[Math.floor(Math.random() * MemberRoleFilterArr.length)]  // 멤버 역할 필터값
    };

    return {
      id,
      title,
      category,
      status,
      createdDate,
      sentDate,
      content,
      writer,
      filter
    };
  });

  return data;
}