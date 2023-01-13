import { faker } from '@faker-js/faker';

import { BookstoreStatusArr, BookstoreThemeArr } from '@types';

export function CreateDummyBookstores() {
  const createdDateList = faker.date.betweens('2021-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z', 500);
  createdDateList.sort((a, b) => a.getTime() - b.getTime());

  const data = createdDateList.map((CD, idx) => {
    const id = idx + 1;  // 식별값
    const name = faker.company.name();  // 이름
    const info = {
      address: faker.address.streetAddress(),
      businessHours: 'XX:XX ~ XX:XX',
      contact: faker.phone.number('###-####-####'),
      facility: faker.lorem.words(Math.floor(Math.random() * 4)),
      sns: faker.internet.url()
    };
    const theme = BookstoreThemeArr[Math.floor(Math.random() * BookstoreThemeArr.length)];  // 테마
    const introduction = faker.lorem.sentence();  // 한줄 소개
    const mainImage = faker.internet.url();  // 대표 이미지
    const subImages = [faker.internet.url(), faker.internet.url()];  // 서브 이미지들
    const status = Math.random() < 0.9 ? BookstoreStatusArr[0] : BookstoreStatusArr[1];  // 노출 상태
    const view = Math.floor(Math.random() * 200);  // 조회수
    const bookmark = Math.floor(Math.random() * view);  // 북마크한 사람 수
    const createdDate = CD;  // 등록 날짜
    const exposedDate = status === '노출' ? faker.date.between(CD, '2023-01-01T00:00:00.000Z') : null;  // 공개 날짜
    const modifiedDate = Math.random() < 0.25 ? faker.date.between(CD, '2023-01-01T00:00:00.000Z') : null;  // 수정 날짜

    return {
      id,
      name,
      info,
      theme,
      introduction,
      mainImage,
      subImages,
      status,
      view,
      bookmark,
      createdDate,
      exposedDate,
      modifiedDate
    };
  });

  return data;
}