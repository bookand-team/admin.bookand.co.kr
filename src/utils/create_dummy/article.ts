import { faker } from '@faker-js/faker';

import { ArticleCategoryArr, ArticleStatusArr, DeviceOSFilterArr, MemberIdFilterArr } from '@types';

export function CreateDummyArticles() {
  const createdDateList = faker.date.betweens('2021-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z', 500);
  createdDateList.sort((a, b) => a.getTime() - b.getTime());

  const data = createdDateList.map((CD, idx) => {
    const id = idx + 1;  // 식별값
    const title = faker.lorem.sentence();  // 제목
    const content = faker.lorem.paragraphs(3);  // 본문
    const category = ArticleCategoryArr[Math.floor(Math.random() * ArticleCategoryArr.length)];  // 유형 분류
    const writer = faker.name.middleName();  // 작성자
    const status = Math.random() < 0.9 ? ArticleStatusArr[0] : ArticleStatusArr[1];  // 노출 상태
    const view = Math.floor(Math.random() * 100);  // 조회수
    const bookmark = Math.floor(Math.random() * view);  // 북마크한 사람 수
    const createdDate = CD;  // 작성 날짜
    const exposedDate = status === '노출' ? faker.date.between(CD, '2023-01-01T00:00:00.000Z') : null;  // 공개 날짜
    const modifiedDate = Math.random() < 0.5 ? faker.date.between(CD, '2023-01-01T00:00:00.000Z') : null;  // 수정 날짜
    const filter = {
      deviceOS: DeviceOSFilterArr[Math.floor(Math.random() * DeviceOSFilterArr.length)], // 디바이스 운영체제 필터값
      memberId: MemberIdFilterArr[Math.floor(Math.random() * MemberIdFilterArr.length)]  // 멤버 식별자 필터값
    };
    return {
      id,
      title,
      content,
      category,
      writer,
      status,
      view,
      bookmark,
      createdDate,
      exposedDate,
      modifiedDate,
      filter
    };
  });

  return data;
}