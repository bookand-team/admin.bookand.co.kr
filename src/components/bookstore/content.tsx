import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useInputText } from '@hooks/use_input';
import { RootState } from '@redux/reducers';
import styles from '@styles/components/bookstore/content.module.scss';
import { BookstoreProperty, BookstoreThemeKey, BookstoreThemeMapping } from '@types';

type PropsType = {
  header: ReactNode;
  submit_btn_name: string;
  delete_btn_name: string;
};

const BookstoreContent = ({ header, submit_btn_name, delete_btn_name }: PropsType) => {
  const { bookstore } = useSelector((state: RootState) => state.bookstore);

  // 입력받은 추가정보 (서점명 검색어, 등록 정보, 한줄 소개, 테마 리스트, 대표 이미지, 서브 이미지)
  const [inputSearch, changeInputSearch, setInputSearch] = useInputText(bookstore ? bookstore.name : '');
  const [selectedProperty, setSelectedProperty] = useState<BookstoreProperty | null>(bookstore ? bookstore.info : null);
  const [inputIntroduction, changeInputIntroduction, setInputIntroduction] = useInputText(bookstore ? bookstore.introduction : '');
  const [checkedThemeList, setCheckedThemeList] = useState<BookstoreThemeKey[]>(bookstore ? bookstore.themeList : []);
  const [mainImageSrc, setMainImageSrc] = useState(bookstore ? bookstore.mainImage : '');
  const [subImagesSrc, setSubImagesSrc] = useState<string[]>(bookstore ? bookstore.subImage.map(img => img.url) : []);

  /** 검색 버튼 - 서점이름을 검색해 서점 정보 불러오기 요청 */
  const searchBtnHandler = useCallback(() => {
    // TODO: 서점이름을 검색해 서점 정보 불러오기 요청
    alert('현재 지원하지 않는 기능입니다.');
  }, []);

  /** 선택한 테마 리스트 변경 */
  const changeCheckedThemeList = useCallback((keyOfTheme: BookstoreThemeKey) => () => {
    if (checkedThemeList.includes(keyOfTheme)) {
      setCheckedThemeList(checkedThemeList.filter(value => value !== keyOfTheme));
    } else {
      setCheckedThemeList([...checkedThemeList, keyOfTheme]);
    }
  }, [checkedThemeList]);

  /** 파일 선택 버튼 - 이미지 파일 업로드 및 미리보기 생성 */
  const selectFileBtnHandler = useCallback(() => {
    // TODO: 이미지 파일 업로드 및 미리보기 생성
    alert('현재 지원하지 않는 기능입니다.');
  }, []);

  // /** 이미지 파일을 인코딩해 이미지 미리보기 생성 */
  // const createImagePreview = useCallback((fileBlob: Blob) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(fileBlob);
  //   return new Promise((resolve) => {
  //     reader.onload = () => {
  //       resolve(reader.result);
  //     };
  //   });
  // }, []);

  // /** 대표 이미지 버튼 - 대표 이미지 저장, 미리보기 저장 */
  // const mainImageBtnHandler = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const result = await createImagePreview(e.target.files[0]);
  //     setMainImageSrc(result as string);
  //   } else {
  //     setMainImageSrc('');
  //   }
  // }, []);

  // /** 서브 이미지 버튼 - 서브 이미지 저장, 미리보기 저장 */
  // const subImageBtnHandler = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const results = [];
  //     for (let i = 0; i < e.target.files.length; i++) {
  //       const result = await createImagePreview(e.target.files[i]);
  //       results.push(result);
  //     }
  //     setSubImagesSrc(results as string[]);
  //   } else {
  //     setSubImagesSrc([]);
  //   }
  // }, []);

  /** 저장하기/적용하기 버튼 */
  const submitBtnHandler = useCallback(() => {
    // TODO: 저장하기/적용하기 버튼 기능 구현
    alert('현재 지원하지 않는 기능입니다.');
  }, []);

  /** 작성취소/삭제하기 버튼 */
  const deleteBtnHandler = useCallback(() => {
    // TODO: 작성취소/삭제하기 버튼
    alert('현재 지원하지 않는 기능입니다.');
  }, []);

  // 서점 조회 성공시 조회된 정보 출력
  useEffect(() => {
    if (bookstore) {
      setInputSearch(bookstore.name);
      setSelectedProperty(bookstore.info);
      setInputIntroduction(bookstore.introduction);
      setCheckedThemeList(bookstore.themeList);
      setMainImageSrc(bookstore.mainImage);
      setSubImagesSrc(bookstore.subImage.map(img => img.url));
    }
  }, [bookstore]);

  return (
    <section className={styles.container}>
      {header}
      <div className={styles.content}>
        <section>
          <h3>기본 정보</h3>
          <div>
            <div className={styles.key}>서점명</div>
            <div className={styles.search}>
              <input type='text' value={inputSearch} onChange={changeInputSearch} spellCheck='false' />
              <button onClick={searchBtnHandler}>검색</button>
            </div>
          </div>
          <div>
            <div className={styles.key}>주소</div>
            <div className={styles.value}>{selectedProperty?.address}</div>
          </div>
          <div>
            <div className={styles.key}>영업시간</div>
            <div className={styles.value}>{selectedProperty?.businessHours}</div>
          </div>
          <div>
            <div className={styles.key}>전화번호</div>
            <div className={styles.value}>{selectedProperty?.contact}</div>
          </div>
          <div>
            <div className={styles.key}>시설정보</div>
            <div className={styles.value}>{selectedProperty?.facility}</div>
          </div>
          <div>
            <div className={styles.key}>SNS</div>
            <div className={styles.value}>{selectedProperty?.sns}</div>
          </div>
        </section>
        <section>
          <h3>추가 정보</h3>
          <div>
            <div className={styles.key}>한줄 소개</div>
            <div className={styles.introduction}>
              <input type='text' value={inputIntroduction} onChange={changeInputIntroduction} spellCheck='false' />
              <span>{`(${inputIntroduction.length}/25)`}</span>
            </div>
          </div>
          <div>
            <div className={styles.key}>테마</div>
            <div className={styles.theme}>
              {BookstoreThemeMapping.map((theme, idx) => {
                if (theme.value !== '')
                  return <label key={idx}>
                    <input type='checkbox' checked={checkedThemeList.includes(theme.key)} onChange={changeCheckedThemeList(theme.key)} />{theme.value}
                  </label>;
              })}
            </div>
          </div>
          <div>
            <div className={styles.key}>사진 선택</div>
            <div className={styles.image}>
              <button onClick={selectFileBtnHandler}>파일 선택</button>
            </div>
          </div>
        </section>
        {/* <div className={styles.info}>
          <h3 className={styles.h3}>추가작성 정보관리</h3>
          <div>
            <div>
              <div className={styles.key}>한줄소개</div>
              <input className={styles.value} value={inputIntroduction} onChange={changeInputIntroduction} spellCheck='false' />
            </div>
            <div>
              <select className={styles.value} value={selectTheme} onChange={changeSelectTheme}>
                <option value='' disabled>테마 선택</option>
                {BookstoreThemeValueList.map((value) =>
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
                  TODO: {
                    mainImageSrc
                      ? <Image src={mainImageSrc} alt='preview-image' width={150} height={150} />
                      : <div className={styles.main}>대표 이미지</div>
                  }
                  <div className={styles.main}>대표 이미지</div>
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
              <>
                <li><label htmlFor='sub-image'><div>서브 이미지</div></label></li>
                <li><label htmlFor='sub-image'><div>서브 이미지</div></label></li>
                <li><label htmlFor='sub-image'><div>서브 이미지</div></label></li>
                <li><label htmlFor='sub-image'><div>서브 이미지</div></label></li>
                <li><label htmlFor='sub-image'><div>서브 이미지</div></label></li>
              </>
            </ul>
          </div>
        </div> */}
      </div>
      <nav className={styles.buttons}>
        <button className={styles.submit_btn} onClick={submitBtnHandler}>{submit_btn_name}</button>
        <button className={styles.delete_btn} onClick={deleteBtnHandler}>{delete_btn_name}</button>
      </nav>
    </section>
  );
};

export default BookstoreContent;