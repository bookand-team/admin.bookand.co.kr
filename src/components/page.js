import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import changeQuery from '../hooks/change_query';
import leftArrowIcon from '../images/left_arrow_icon.svg';
import leftArrow2Icon from '../images/left_arrow_icon2.svg';
import rightArrowIcon from '../images/right_arrow_icon.svg';
import rightArrow2Icon from '../images/right_arrow_icon2.svg';
import styles from '../styles/page.module.css';

const Page = ({ tableRow = 5, maxSelection = 10, contentsLength }) => {
  const router = useRouter();
  const { page } = useSelector((state) => state.page);

  /** 화면에 표시될 page 선택 범위에 맞는 배열 생성 함수 */
  const selectionRange = useCallback(() => {
    const array = [];
    if (page) {
      for (let i = parseInt((page - 1) / maxSelection) * maxSelection + 1; i <= parseInt((page - 1) / maxSelection) * maxSelection + maxSelection && i <= parseInt((contentsLength - 1) / tableRow) + 1; i++) {
        array.push(i);
      }
    } else {
      for (let i = 1; i <= maxSelection && i <= parseInt((contentsLength - 1) / tableRow) + 1; i++) {
        array.push(i);
      }
    }
    return array;
  }, [page, contentsLength]);

  /** 이전 pages로 이동  */
  const moveToPreviousPages = useCallback(() => {
    if (page !== null) {
      if (page > 10) {
        const newQuery = changeQuery(router, { page: parseInt((page - 1) / maxSelection) * maxSelection });
        router.push(`${router.pathname}${newQuery}`);
      } else {
        const newQuery = changeQuery(router, { page: 1 });
        router.push(`${router.pathname}${newQuery}`);
      }
    }
  }, [router, page]);

  /** 이전 page로 이동 */
  const moveToPreviousPage = useCallback(() => {
    if (page !== null) {
      if (page > 1) {
        const newQuery = changeQuery(router, { page: page - 1 });
        router.push(`${router.pathname}${newQuery}`);
      }
    }
  }, [router, page]);

  /** 선택한 숫자의 page로 이동 */
  const moveToNumberPage = useCallback((pageNumber) => () => {
    const newQuery = changeQuery(router, { page: pageNumber });
    router.push(`${router.pathname}${newQuery}`);
  }, [router]);

  /** 다음 page로 이동 */
  const moveToNextPage = useCallback(() => {
    if (page === null) {
      const newQuery = changeQuery(router, { page: 2 });
      router.push(`${router.pathname}${newQuery}`);
    } else if (page < parseInt((contentsLength - 1) / tableRow) + 1) {
      const newQuery = changeQuery(router, { page: page + 1 });
      router.push(`${router.pathname}${newQuery}`);
    }
  }, [router, page, contentsLength]);

  /** 다음 pages로 이동 */
  const moveToNextPages = useCallback(() => {
    if (page === null) {
      if (maxSelection + 1 <= parseInt((contentsLength - 1) / tableRow) + 1) {
        const newQuery = changeQuery(router, { page: maxSelection + 1 });
        router.push(`${router.pathname}${newQuery}`);
      } else {
        const newQuery = changeQuery(router, { page: parseInt((contentsLength - 1) / tableRow) + 1 });
        router.push(`${router.pathname}${newQuery}`);
      }
    } else if (page < parseInt((contentsLength - 1) / tableRow) + 1) {
      if (parseInt((page - 1) / maxSelection) * maxSelection + maxSelection + 1 <= parseInt((contentsLength - 1) / tableRow) + 1) {
        const newQuery = changeQuery(router, { page: parseInt((page - 1) / maxSelection) * maxSelection + maxSelection + 1 });
        router.push(`${router.pathname}${newQuery}`);
      } else {
        const newQuery = changeQuery(router, { page: parseInt((contentsLength - 1) / tableRow) + 1 });
        router.push(`${router.pathname}${newQuery}`);
      }
    }
  }, [router, page, contentsLength]);

  return (
    <nav className={styles.page}>
      <button className={styles.left2} onClick={moveToPreviousPages}>
        <Image src={leftArrow2Icon} alt='left arrow icon' />
      </button>
      <button className={styles.left} onClick={moveToPreviousPage}>
        <Image src={leftArrowIcon} alt='left arrow icon' />
      </button>
      {selectionRange().map((number) => {
        if ((page === null && number === 1) || (page === number)) {
          return (
            <button className={styles.current} key={number} onClick={moveToNumberPage(number)}>{number}</button>
          );
        } else {
          return (
            <button key={number} onClick={moveToNumberPage(number)}>{number}</button>
          );
        }
      })}
      <button className={styles.right} onClick={moveToNextPage}>
        <Image src={rightArrowIcon} alt='right arrow icon' />
      </button>
      <button className={styles.right2} onClick={moveToNextPages}>
        <Image src={rightArrow2Icon} alt='right arrow icon' />
      </button>
    </nav>
  );
};

export default Page;