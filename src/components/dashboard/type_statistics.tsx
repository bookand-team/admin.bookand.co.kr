import SectionHeader from '@components/common/section_header';
import Doughnut from '@components/dashboard/graph/doughnut';
import { useInputSelect } from '@hooks/use_input';
import styles from '@styles/components/dashboard/type_statistics.module.scss';
import { DeviceOSFilter, DeviceOSFilterArr } from '@types';

const withdrawValues = {
  '전체': [7, 8, 4, 9, 11, 11],
  'Android': [3, 5, 3, 3, 4, 5],
  'IOS': [4, 3, 1, 6, 7, 6]
};

const feedbackValues = {
  '전체': [36, 45, 34, 34, 26, 31, 31, 36, 27],
  'Android': [16, 18, 15, 21, 13, 18, 17, 18, 10],
  'IOS': [20, 27, 19, 13, 13, 13, 14, 18, 17]
};

const TypeStatistics = () => {
  // 선택한 데이터 (탈퇴회원 필터, 피드백 필터)
  const [selectWithdrawalMember, changeSelectWithdrawalMember] = useInputSelect<DeviceOSFilter>('전체');
  const [selectFeedback, changeSelectFeedback] = useInputSelect<DeviceOSFilter>('전체');

  return (
    <section className={styles.container}>
      <SectionHeader title='유형 통계' />
      <div className={styles.content}>
        <div className={styles.sub_content}>
          <h3>탈퇴회원</h3>
          <select value={selectWithdrawalMember} onChange={changeSelectWithdrawalMember} >
            {DeviceOSFilterArr.map((value) =>
              <option key={`탈퇴회원${value}`} value={value}>{value}</option>
            )}
          </select>
          <div className={styles.graphWrapper}>
            <Doughnut
              labels={['사용빈도', '콘텐츠', 'UI/UX', '시스템 에러', '개인정보', '기타']}
              values={withdrawValues[selectWithdrawalMember]}
            />
          </div>
        </div>
        <div className={styles.sub_content}>
          <h3>피드백</h3>
          <select value={selectFeedback} onChange={changeSelectFeedback} >
            {DeviceOSFilterArr.map((value) =>
              <option key={`탈퇴회원${value}`} value={value}>{value}</option>
            )}
          </select>
          <div className={styles.graphWrapper}>
            <Doughnut
              labels={['정보오류', '정보누락', '업데이트', '로그인', '보안', 'PUSH', 'UI/UX', '에러', '기타']}
              values={feedbackValues[selectFeedback]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypeStatistics;