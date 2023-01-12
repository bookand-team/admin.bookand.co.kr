import Image from 'next/image';
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useRef } from 'react';

import { useInputSelect } from '@hooks/use_input';
import imgIcon from '@images/image_icon.svg';
import styles from '@styles/article/extra_contents.module.css';
import buttonStyles from '@styles/layout/button.module.css';
import { ArticleCategory, TargetDevice, TargetMemberId } from '@types';

type PropsType = {
  setStage: Dispatch<SetStateAction<'contents' | 'extra contents'>>;
};

const ExtraContents = ({ setStage }: PropsType) => {
  // 입력받은 아티클 정보 (카테고리, 노출 디바이스, 노출 멤버 식별자)
  const [selectCategory, changeSelectCategory] = useInputSelect<ArticleCategory>('');
  const [selectTargetDevice, changeSelectTargetDevice] = useInputSelect<TargetDevice>('');
  const [selectTargetMemberId, changeSelectTargetMemberId] = useInputSelect<TargetMemberId>('');

  // 대표 이미지 선택 버튼 선택자
  const mainImageRef = useRef<HTMLInputElement>(null);

  /** 대표 이미지 선택 버튼 - 파일 선택창 열기 */
  const openFileSelectionWindow = useCallback(() => {
    if (mainImageRef.current) {
      mainImageRef.current.click();
    }
  }, [mainImageRef.current]);

  /** (파일 선택창) 파일 선택 -> 선택 이미지 파일을 서버에 저장 후, 이미지 파일의 url 불러오기 */
  const getImageUrl = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    // TODO: 이미지 파일 저장 및 url 요청
    if (e.target.files) {
      // const formData = new FormData();
      // formData.append('image', e.target.files[0]);
      alert('현재 지원하지 않는 기능입니다.');
    }
  }, []);

  /** 뒤로가기 버튼 - 이전 페이지로 이동 */
  const backBtnHandler = useCallback(() => {
    setStage('contents');
  }, []);

  /** 저장하기 버튼 - 작성한 내용 저장 요청 */
  const submitBtnHandler = useCallback(() => {
    // TODO: 작성한 내용 저장 요청 기능
    alert('현재 지원하지 않는 기능입니다.');
  }, []);

  return (
    <div className={styles.background}>
      <section className={styles.container}>
        <div className={styles.left}>
          <div className={styles.description}>대표 이미지 미리보기</div>
          <input ref={mainImageRef} type='file' accept='image/*' hidden onChange={getImageUrl} />
          <div className={styles.main_image}>
            <div><Image src={imgIcon} alt='대표 이미지 선택 전 배경' width={100} height={100} /></div>
            <div className={styles.img_btn}><button onClick={openFileSelectionWindow}>대표 이미지 선택</button></div>
          </div>
          <div className={styles.description}>한줄소개</div>
          <div className={styles.intro}>
            <textarea placeholder='아티클 한줄소개를 입력해주세요' />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.select_area}>
            <div className={styles.property}>
              <div className={styles.description}>아티클 속성</div>
              <div className={styles.select}>
                <div>카테고리</div>
                <select value={selectCategory} onChange={changeSelectCategory}>
                  <option value='' disabled>카테고리</option>
                  <option value='서점소개'>서점소개</option>
                  <option value='책소개'>책소개</option>
                  <option value='인터뷰'>인터뷰</option>
                </select>
              </div>
            </div>
            <div className={styles.filter}>
              <div className={styles.description}>적용 필터</div>
              <div className={styles.select}>
                <div>운영체제</div>
                <select value={selectTargetDevice} onChange={changeSelectTargetDevice}>
                  <option value='' disabled>Device</option>
                  <option value='전체'>전체</option>
                  <option value='Android'>Android</option>
                  <option value='IOS'>IOS</option>
                </select>
              </div>
              <div className={styles.select}>
                <div>사용자</div>
                <select value={selectTargetMemberId} onChange={changeSelectTargetMemberId}>
                  <option value='' disabled>Member ID</option>
                  <option value='전체'>전체</option>
                  <option value='홀수'>홀수</option>
                  <option value='짝수'>짝수</option>
                </select>
              </div>
            </div>
          </div>
          <div className={buttonStyles.buttons}>
            <button className={buttonStyles.back_btn} onClick={backBtnHandler}>뒤로가기</button>
            <button className={buttonStyles.submit_btn} onClick={submitBtnHandler}>저장하기</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExtraContents;