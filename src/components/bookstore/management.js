import { useRouter } from 'next/router';
import { useCallback } from 'react';

import styles from '../../styles/bookstore/management.module.css';
import Page from '../page';

const Management = () => {
  const router = useRouter();

  const moveRegistration = useCallback(() => {
    router.push('/bookstore/registration');
  }, []);


  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>서점 관리</h2>
        <div className={styles.search}>
          <div>
            <div>서점명</div>
            <input />
          </div>
          <button>검색</button>
        </div>
      </div>
      <div className={styles.contents}>
        <div className={styles.subjectRow}>
          <div className={styles.id}>번호</div>
          <div className={styles.title}>서점명</div>
          <div className={styles.theme}>테마</div>
          <div className={styles.view}>누적뷰수</div>
          <div className={styles.bookmark}>북마크수</div>
          <div className={styles.status}>노출상태</div>
          <div className={styles.createdDate}>등록일자</div>
          <div className={styles.exposedDate}>노출일자</div>
          <div className={styles.modifiedDate}>최종 수정일자</div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.title}>nickEx01</div>
          <div className={styles.theme}>여행</div>
          <div className={styles.view}>1009</div>
          <div className={styles.bookmark}>101</div>
          <div className={styles.status}>노출</div>
          <div className={styles.createdDate}>2022-10-09 00:12</div>
          <div className={styles.exposedDate}>2022-10-12 00:12</div>
          <div className={styles.modifiedDate}>2022-10-12 00:12</div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.title}>nickEx01</div>
          <div className={styles.theme}>음악</div>
          <div className={styles.view}>1009</div>
          <div className={styles.bookmark}>101</div>
          <div className={styles.status}>노출</div>
          <div className={styles.createdDate}>2022-10-09 00:12</div>
          <div className={styles.exposedDate}>2022-10-12 00:12</div>
          <div className={styles.modifiedDate}>2022-10-12 00:12</div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.title}>nickEx01</div>
          <div className={styles.theme}>그림</div>
          <div className={styles.view}>1009</div>
          <div className={styles.bookmark}>101</div>
          <div className={styles.status}>노출</div>
          <div className={styles.createdDate}>2022-10-09 00:12</div>
          <div className={styles.exposedDate}>2022-10-12 00:12</div>
          <div className={styles.modifiedDate}>2022-10-12 00:12</div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.title}>nickEx01</div>
          <div className={styles.theme}>애완동물</div>
          <div className={styles.view}>1009</div>
          <div className={styles.bookmark}>101</div>
          <div className={styles.status}>노출</div>
          <div className={styles.createdDate}>2022-10-09 00:12</div>
          <div className={styles.exposedDate}>2022-10-12 00:12</div>
          <div className={styles.modifiedDate}>2022-10-12 00:12</div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.title}>nickEx01</div>
          <div className={styles.theme}>영화</div>
          <div className={styles.view}>1009</div>
          <div className={styles.bookmark}>101</div>
          <div className={styles.status}>노출</div>
          <div className={styles.createdDate}>2022-10-09 00:12</div>
          <div className={styles.exposedDate}>2022-10-12 00:12</div>
          <div className={styles.modifiedDate}>2022-10-12 00:12</div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.title}>nickEx01</div>
          <div className={styles.theme}>추리</div>
          <div className={styles.view}>1009</div>
          <div className={styles.bookmark}>101</div>
          <div className={styles.status}>노출</div>
          <div className={styles.createdDate}>2022-10-09 00:12</div>
          <div className={styles.exposedDate}>2022-10-12 00:12</div>
          <div className={styles.modifiedDate}>2022-10-12 00:12</div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.title}>nickEx01</div>
          <div className={styles.theme}>역사</div>
          <div className={styles.view}>1009</div>
          <div className={styles.bookmark}>101</div>
          <div className={styles.status}>노출</div>
          <div className={styles.createdDate}>2022-10-09 00:12</div>
          <div className={styles.exposedDate}>2022-10-12 00:12</div>
          <div className={styles.modifiedDate}>2022-10-12 00:12</div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.title}>nickEx01</div>
          <div className={styles.theme}></div>
          <div className={styles.view}>1009</div>
          <div className={styles.bookmark}>101</div>
          <div className={styles.status}>노출</div>
          <div className={styles.createdDate}>2022-10-09 00:12</div>
          <div className={styles.exposedDate}>2022-10-12 00:12</div>
          <div className={styles.modifiedDate}>2022-10-12 00:12</div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.title}>nickEx01</div>
          <div className={styles.theme}></div>
          <div className={styles.view}>1009</div>
          <div className={styles.bookmark}>101</div>
          <div className={styles.status}>노출</div>
          <div className={styles.createdDate}>2022-10-09 00:12</div>
          <div className={styles.exposedDate}>2022-10-12 00:12</div>
          <div className={styles.modifiedDate}>2022-10-12 00:12</div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.title}>nickEx01</div>
          <div className={styles.theme}></div>
          <div className={styles.view}>1009</div>
          <div className={styles.bookmark}>101</div>
          <div className={styles.status}>노출</div>
          <div className={styles.createdDate}>2022-10-09 00:12</div>
          <div className={styles.exposedDate}>2022-10-12 00:12</div>
          <div className={styles.modifiedDate}>2022-10-12 00:12</div>
        </div>
      </div>
      <Page />
      <div className={styles.buttons}>
        <button className={styles.registration} onClick={moveRegistration}>서점 추가하기</button>
        <button className={styles.removal}>삭제하기</button>
      </div>
    </div>
  );
};

export default Management;