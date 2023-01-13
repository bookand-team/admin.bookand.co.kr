import { nanoid } from '@reduxjs/toolkit';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { useInputSelect, useInputText } from '@hooks/use_input';
import { RootState } from '@redux/reducers';
import styles from '@styles/bookstore/registration.module.css';
import buttonStyles from '@styles/layout/button.module.css';
import { BookstoreTheme, BookstoreThemeArr } from '@types';

const Modification = () => {
  const router = useRouter();
  const { bookstore } = useSelector((state: RootState) => state.bookstore);

  // 입력받은 추가정보 (한줄소개, 테마, 대표 이미지 미리보기, 서브 이미지들 미리보기)
  const [inputIntroduction, changeInputIntroduction] = useInputText(bookstore?.introduction ? bookstore.introduction : '');
  const [selectTheme, changeSelectTheme] = useInputSelect<'' | BookstoreTheme>(bookstore?.theme ? bookstore.theme : '');
  const [mainImageSrc, setMainImageSrc] = useState(bookstore?.mainImage ? bookstore.mainImage : '');
  const [subImagesSrc, setSubImagesSrc] = useState<string[]>(bookstore?.subImages ? bookstore.subImages : []);

  /** 검색 버튼 - 서점이름을 검색해 서점 정보 불러오기 요청 */
  const searchBtnHandler = useCallback(() => {
    // TODO: 서점이름을 검색해 서점 정보 불러오기 요청
    alert('현재 지원하지 않는 기능입니다.');
  }, []);

  /** 이미지 파일을 인코딩해 이미지 미리보기 생성 */
  const createImagePreview = useCallback((fileBlob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  }, []);

  /** 대표 이미지 버튼 - 대표 이미지 저장, 미리보기 저장 */
  const mainImageBtnHandler = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const result = await createImagePreview(e.target.files[0]);
      setMainImageSrc(result as string);
    } else {
      setMainImageSrc('');
    }
  }, []);

  /** 서브 이미지 버튼 - 서브 이미지 저장, 미리보기 저장 */
  const subImageBtnHandler = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const results = [];
      for (let i = 0; i < e.target.files.length; i++) {
        const result = await createImagePreview(e.target.files[i]);
        results.push(result);
      }
      setSubImagesSrc(results as string[]);
    } else {
      setSubImagesSrc([]);
    }
  }, []);

  /** 뒤로가기 버튼 - 이전 페이지로 이동 */
  const backBtnHandler = useCallback(() => {
    if (confirm('서점 수정을 취소하면 변경사항은 저장되지 않습니다.\n서점 수정을 취소하시겠습니까?')) {
      router.back();
    }
  }, []);

  /** 저장하기 버튼 - 수정사항 저장 요청 */
  const submitBtnHandler = useCallback(() => {
    // TODO: 수정사항 저장 요청 기능
    if (inputIntroduction === '') {
      return alert('서점 한줄소개를 입력해주세요.');
    } else if (selectTheme === '') {
      return alert('서점 테마를 선택해주세요.');
    }
    alert('현재 지원하지 않는 기능입니다.');
  }, [inputIntroduction, selectTheme]);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>서점 수정</h2>
      </div>
      <div className={styles.contents}>
        <div className={styles.search}>
          <div>
            <div className={styles.key}>서점 이름</div>
            <div className={styles.value} onClick={searchBtnHandler}></div>
          </div>
          <button onClick={searchBtnHandler}>검색</button>
        </div>
        <div className={styles.info}>
          <h3 className={styles.h3}>API 정보관리</h3>
          <div>
            <div>
              <div className={styles.key}>주소</div>
              <div className={styles.value}></div>
            </div>
            <div>
              <div className={styles.key}>영업시간</div>
              <div className={styles.value}></div>
            </div>
            <div>
              <div className={styles.key}>전화번호</div>
              <div className={styles.value}></div>
            </div>
            <div>
              <div className={styles.key}>시설정보</div>
              <div className={styles.value}></div>
            </div>
            <div>
              <div className={styles.key}>SNS</div>
              <div className={styles.value}></div>
            </div>
          </div>
        </div>
        <div className={styles.info}>
          <h3 className={styles.h3}>추가작성 정보관리</h3>
          <div>
            <div>
              <div className={styles.key}>한줄소개</div>
              <input className={styles.value} value={inputIntroduction} onChange={changeInputIntroduction} />
            </div>
            <div>
              <select className={styles.value} value={selectTheme} onChange={changeSelectTheme}>
                <option value='' disabled>테마 선택</option>
                {BookstoreThemeArr.map((value) =>
                  <option key={nanoid()} value={value}>{value}</option>
                )}
              </select>
            </div>
            <div>
              <div className={styles.title}>서점 상세페이지 노출 이미지 관리</div>
              <div>
                <input id='main-image' type='file' accept='image/*' hidden onChange={mainImageBtnHandler} />
                <input id='sub-image' type='file' accept='image/*' multiple hidden onChange={subImageBtnHandler} />
              </div>
            </div>
            <ul>
              <li>
                <label htmlFor='main-image'>
                  {
                    mainImageSrc
                      ? <Image src={mainImageSrc} alt='preview-image' width={150} height={150} />
                      : <div className={styles.main}>대표 이미지</div>
                  }
                </label>
              </li>
              {
                subImagesSrc.length === 0
                  ?
                  <>
                    <li><label htmlFor='sub-image'><div>서브 이미지</div></label></li>
                    <li><label htmlFor='sub-image'><div>서브 이미지</div></label></li>
                    <li><label htmlFor='sub-image'><div>서브 이미지</div></label></li>
                    <li><label htmlFor='sub-image'><div>서브 이미지</div></label></li>
                    <li><label htmlFor='sub-image'><div>서브 이미지</div></label></li>
                  </>
                  :
                  subImagesSrc.map((imageSrc) => {
                    return (
                      <li key={nanoid()}>
                        <label htmlFor='sub-image'>
                          <Image src={imageSrc} alt='preview-image' width={150} height={150} />
                        </label>
                      </li>
                    );
                  })
              }
            </ul>
          </div>
        </div>
      </div>
      <div className={buttonStyles.buttons}>
        <button className={buttonStyles.back_btn} onClick={backBtnHandler}>뒤로가기</button>
        <button className={buttonStyles.submit_btn} onClick={submitBtnHandler}>저장하기</button>
      </div>
    </section>
  );
};

export default Modification;