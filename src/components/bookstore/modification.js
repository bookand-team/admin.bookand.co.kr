import { nanoid } from '@reduxjs/toolkit';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import useInput from '../../hooks/use_input';
import styles from '../../styles/bookstore/registration.module.css';
import buttonStyles from '../../styles/layout/button.module.css';

const Modification = () => {
  const router = useRouter();

  // 입력받은 추가정보 (한줄소개, 테마, 이미지 파일, 이미지 파일 미리보기 리스트)
  const [inputInformation, changeInputInformation] = useInput();
  const [selectTheme, changeSelectTheme] = useInput();
  const [imageSource, setImageSource] = useState('');
  const [imageSources, setImageSources] = useState([]);

  /** 서점 이름을 통한 서점 검색 */
  const searchNameHandler = useCallback(() => {
    // feature
    alert('현재 지원하지 않는 기능입니다.');
  }, []);

  /** 이미지 파일 선택 */
  const encodeFileToBase64 = useCallback((event) => {
    if (event.target.files[0]) {
      const fileBlob = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileBlob);
      return new Promise((resolve) => {
        reader.onload = () => {
          setImageSource(reader.result);
          resolve();
        };
      });
    } else {
      setImageSource('');
    }
  }, []);

  /** 선택한 파일 미리보기 리스트에 추가 */
  useEffect(() => {
    if (imageSource !== '') {
      setImageSources([...imageSources, imageSource]);
      setImageSource('');
    }
  }, [imageSource]);

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
              <div className={styles.key}>테마</div>
              <select className={styles.value} value={selectTheme} onChange={changeSelectTheme}>
                <option value=''></option>
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
              <div>서점 상세페이지 노출 이미지 관리</div>
              <div><input type='file' onChange={encodeFileToBase64} /></div>
            </div>
            <ul>
              {
                imageSources && imageSources.map((imageSrc) => {
                  return (
                    <li key={nanoid()}>
                      <Image src={imageSrc} alt='preview-img' width={150} height={150} />
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