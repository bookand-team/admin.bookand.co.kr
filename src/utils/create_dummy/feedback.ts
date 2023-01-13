import { faker } from '@faker-js/faker';

import { DeviceOSChoiceArr, FeedbackCategoryArr } from '@types';

export function CreateDummyFeedbacks() {
  const createdDateList = faker.date.betweens('2021-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z', 300);
  createdDateList.sort((a, b) => a.getTime() - b.getTime());

  const data = createdDateList.map((CD, idx) => {
    const id = idx + 1;  // 식별값
    const category = FeedbackCategoryArr[Math.floor(Math.random() * FeedbackCategoryArr.length)];  // 유형 분류
    const content = faker.lorem.paragraph();  // 내용
    const score = Math.floor(Math.random() * 11);  // 평점(별점)
    const createdDate = CD;  // 작성 날짜
    const email = faker.internet.email();  // 이메일
    const deviceOS = DeviceOSChoiceArr[Math.floor(Math.random() * DeviceOSChoiceArr.length)];  // 디바이스 운영체제

    return {
      id,
      category,
      content,
      score,
      createdDate,
      email,
      deviceOS
    };
  });

  return data;
}