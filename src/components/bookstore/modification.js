import { nanoid } from '@reduxjs/toolkit';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import useInput from '../../hooks/use_input';
import styles from '../../styles/bookstore/registration.module.css';
import buttonStyles from '../../styles/layout/button.module.css';

const Modification = () => {
  const router = useRouter();

  // 입력받은 추가정보 (한줄소개, 테마, 대표 이미지 미리보기, 서브 이미지들 미리보기)
  const [inputInformation, changeInputInformation] = useInput();
  const [selectTheme, changeSelectTheme] = useInput();
  const [mainImage, setMainImage] = useState('');
  const [subImages, setSubImages] = useState([]);

  /** 서점 이름을 통한 서점 검색 */
  const searchNameHandler = useCallback(() => {
    // feature
    alert('현재 지원하지 않는 기능입니다.');
  }, []);

  /** 이미지 미리보기 생성 함수 */
  const encodeFileToBase64 = useCallback((fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  }, []);

  /** 메인 이미지 미리보기 생성 */
  const mainImageHandler = useCallback(async (event) => {
    if (event.target.files[0]) {
      const result = await encodeFileToBase64(event.target.files[0]);
      setMainImage(result);
    } else {
      setMainImage('');
    }
  }, []);

  /** 서브 이미지들 미리보기 생성 */
  const subImageHandler = useCallback(async (event) => {
    if (event.target.files.length !== 0) {
      const results = [];
      for (let i = 0; i < event.target.files.length; i++) {
        const result = await encodeFileToBase64(event.target.files[i]);
        results.push(result);
      }
      setSubImages(results);
    } else {
      setSubImages([]);
    }
  }, []);

  /** 서점 수정 취소 버튼 */
  const cancelRegistrationHandler = useCallback(() => {
    if (confirm('서점 수정을 취소하면 변경사항은 저장되지 않습니다.\n서점 수정을 취소하시겠습니까?')) {
      router.push('/bookstore');
    }
  }, []);

  /** 서점 수정 완료 버튼 */
  const completeRegistrationHandler = useCallback(() => {
    if (inputInformation === '') {
      return alert('서점 한줄소개를 입력해주세요.');
    } else if (selectTheme === '') {
      return alert('서점 테마를 선택해주세요.');
    }
    // feature
    alert('현재 지원하지 않는 기능입니다.');
  }, [inputInformation, selectTheme]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>서점 수정</h2>
      </div>
      <div className={styles.contents}>
        <div className={styles.search}>
          <div>
            <div className={styles.key}>서점 이름</div>
            <div className={styles.value} onClick={searchNameHandler}></div>
          </div>
          <button onClick={searchNameHandler}>검색</button>
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
              <input className={styles.value} value={inputInformation} onChange={changeInputInformation} />
            </div>
            <div>
              <select className={styles.value} value={selectTheme} onChange={changeSelectTheme}>
                <option value='' disabled>테마 선택</option>
                <option value='여행'>여행</option>
                <option value='음악'>음악</option>
                <option value='그림'>그림</option>
                <option value='애완동물'>애완동물</option>
                <option value='영화'>영화</option>
                <option value='추리'>추리</option>
                <option value='역사'>역사</option>
              </select>
            </div>
            <div>
              <div className={styles.title}>서점 상세페이지 노출 이미지 관리</div>
              <div>
                <input id='main-image' type='file' accept='image/*' hidden onChange={mainImageHandler} />
                <input id='sub-image' type='file' accept='image/*' multiple hidden onChange={subImageHandler} />
              </div>
            </div>
            <ul>
              <li>
                <label htmlFor='main-image'>
                  {
                    mainImage
                      ? <Image src={mainImage} alt='preview-image' width={150} height={150} />
                      : <div className={styles.main}>대표 이미지</div>
                  }
                </label>
              </li>
              {
                subImages.length === 0
                  ?
                  <>
                    <li><label htmlFor='sub-image'><div>서브 이미지</div></label></li>
                    <li><label htmlFor='sub-image'><div>서브 이미지</div></label></li>
                    <li><label htmlFor='sub-image'><div>서브 이미지</div></label></li>
                    <li><label htmlFor='sub-image'><div>서브 이미지</div></label></li>
                    <li><label htmlFor='sub-image'><div>서브 이미지</div></label></li>
                  </>
                  :
                  subImages.map((imageSrc) => {
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
        <button className={buttonStyles.cancellation} onClick={cancelRegistrationHandler}>수정취소</button>
        <button className={buttonStyles.completion} onClick={completeRegistrationHandler}>수정완료</button>
      </div>
    </div>
  );
};

export default Modification;