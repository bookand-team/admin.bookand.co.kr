import styles from '../../styles/member/management.module.css';
import Page from '../page';

const Management = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>회원 관리</h2>
        <div className={styles.search}>
          <div>
            <div>닉네임</div>
            <input />
          </div>
          <button>검색</button>
        </div>
      </div>
      <div className={styles.contents}>
        <div className={styles.subjectRow}>
          <div className={styles.id}>User ID</div>
          <div className={styles.nickname}>닉네임</div>
          <div className={styles.status}>상태</div>
          <div className={styles.type}>타입</div>
          <div className={styles.email}>email</div>
          <div className={styles.createdDate}>가입일</div>
          <div className={styles.connectedDate}>접속일</div>
          <div className={styles.details}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.nickname}>nickEx01</div>
          <div className={styles.status}>activated</div>
          <div className={styles.type}>관리자</div>
          <div className={styles.email}>mailEx01@gmail.com</div>
          <div className={styles.createdDate}>2022-08-12 00:12</div>
          <div className={styles.connectedDate}>2022-08-12 00:12</div>
          <div className={styles.details}><button>상세</button></div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.nickname}>nickEx01</div>
          <div className={styles.status}>activated</div>
          <div className={styles.type}>관리자</div>
          <div className={styles.email}>mailEx01@gmail.com</div>
          <div className={styles.createdDate}>2022-08-12 00:12</div>
          <div className={styles.connectedDate}>2022-08-12 00:12</div>
          <div className={styles.details}><button>상세</button></div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.nickname}>nickEx01</div>
          <div className={styles.status}>activated</div>
          <div className={styles.type}>관리자</div>
          <div className={styles.email}>mailEx01@gmail.com</div>
          <div className={styles.createdDate}>2022-08-12 00:12</div>
          <div className={styles.connectedDate}>2022-08-12 00:12</div>
          <div className={styles.details}><button>상세</button></div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.nickname}>nickEx01</div>
          <div className={styles.status}>activated</div>
          <div className={styles.type}>관리자</div>
          <div className={styles.email}>mailEx01@gmail.com</div>
          <div className={styles.createdDate}>2022-08-12 00:12</div>
          <div className={styles.connectedDate}>2022-08-12 00:12</div>
          <div className={styles.details}><button>상세</button></div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.nickname}>nickEx01</div>
          <div className={styles.status}>activated</div>
          <div className={styles.type}>관리자</div>
          <div className={styles.email}>mailEx01@gmail.com</div>
          <div className={styles.createdDate}>2022-08-12 00:12</div>
          <div className={styles.connectedDate}>2022-08-12 00:12</div>
          <div className={styles.details}><button>상세</button></div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.nickname}>nickEx01</div>
          <div className={styles.status}>activated</div>
          <div className={styles.type}>관리자</div>
          <div className={styles.email}>mailEx01@gmail.com</div>
          <div className={styles.createdDate}>2022-08-12 00:12</div>
          <div className={styles.connectedDate}>2022-08-12 00:12</div>
          <div className={styles.details}><button>상세</button></div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.nickname}>nickEx01</div>
          <div className={styles.status}>activated</div>
          <div className={styles.type}>관리자</div>
          <div className={styles.email}>mailEx01@gmail.com</div>
          <div className={styles.createdDate}>2022-08-12 00:12</div>
          <div className={styles.connectedDate}>2022-08-12 00:12</div>
          <div className={styles.details}><button>상세</button></div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.nickname}>nickEx01</div>
          <div className={styles.status}>activated</div>
          <div className={styles.type}>관리자</div>
          <div className={styles.email}>mailEx01@gmail.com</div>
          <div className={styles.createdDate}>2022-08-12 00:12</div>
          <div className={styles.connectedDate}>2022-08-12 00:12</div>
          <div className={styles.details}><button>상세</button></div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.nickname}>nickEx01</div>
          <div className={styles.status}>activated</div>
          <div className={styles.type}>관리자</div>
          <div className={styles.email}>mailEx01@gmail.com</div>
          <div className={styles.createdDate}>2022-08-12 00:12</div>
          <div className={styles.connectedDate}>2022-08-12 00:12</div>
          <div className={styles.details}><button>상세</button></div>
        </div>
        <div className={styles.row}>
          <div className={styles.id}>12345</div>
          <div className={styles.nickname}>nickEx01</div>
          <div className={styles.status}>activated</div>
          <div className={styles.type}>관리자</div>
          <div className={styles.email}>mailEx01@gmail.com</div>
          <div className={styles.createdDate}>2022-08-12 00:12</div>
          <div className={styles.connectedDate}>2022-08-12 00:12</div>
          <div className={styles.details}><button>상세</button></div>
        </div>
      </div>
      <Page />
    </div>
  );
};

export default Management;