import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import changeQuery from '@hooks/change_query';
import leftArrowIcon from '@images/left_arrow_icon.svg';
import leftArrow2Icon from '@images/left_arrow_icon2.svg';
import rightArrowIcon from '@images/right_arrow_icon.svg';
import rightArrow2Icon from '@images/right_arrow_icon2.svg';
import { RootState } from '@redux/reducers';
import styles from '@styles/common/page.module.css';

type Props = {
  maxSelection?: number;
  contentsLength: number;
};

const Page = ({ maxSelection = 10, contentsLength }: Props) => {
  const router = useRouter();
  const { page, row } = useSelector((state: RootState) => state.page);

  /** 화면에 표시될 page 선택 범위에 맞는 배열 생성 함수 */
  const selectionRange = useCallback(() => {
    const array = [];
    if (page) {
      for (let i = Math.floor((page - 1) / maxSelection) * maxSelection + 1; i <= Math.floor((page - 1) / maxSelection) * maxSelection + maxSelection && i <= Math.floor((contentsLength - 1) / row) + 1; i++) {
        array.push(i);
      }
    } else {
      for (let i = 1; i <= maxSelection && i <= Math.floor((contentsLength - 1) / row) + 1; i++) {
        array.push(i);
      }
    }
    return array;
  }, [page, contentsLength]);

  /** 이전 pages로 이동  */
  const moveToPreviousPages = useCallback(() => {
    let newQuery;
    if (page > 10) {
      newQuery = changeQuery(router.query, { page: Math.floor((page - 1) / maxSelection) * maxSelection });
    } else if (page > 1) {
      newQuery = changeQuery(router.query, { page: 1 });
    } else if (page === 1) {
      return alert('이전 페이지가 존재하지 않습니다.');
    }
    router.push({ pathname: router.pathname, query: newQuery });
  }, [page]);

  /** 이전 page로 이동 */
  const moveToPreviousPage = useCallback(() => {
    let newQuery;
    if (page > 1) {
      newQuery = changeQuery(router.query, { page: page - 1 });
    } else if (page === 1) {
      return alert('이전 페이지가 존재하지 않습니다.');
    }
    router.push({ pathname: router.pathname, query: newQuery });
  }, [page]);

  /** 선택한 숫자의 page로 이동 */
  const moveToNumberPage = useCallback((pageNumber: number) => () => {
    const newQuery = changeQuery(router.query, { page: pageNumber });
    router.push({ pathname: router.pathname, query: newQuery });
  }, []);

  /** 다음 page로 이동 */
  const moveToNextPage = useCallback(() => {
    let newQuery;
    if (page < Math.floor((contentsLength - 1) / row) + 1) {
      newQuery = changeQuery(router.query, { page: page + 1 });
    } else if (page === Math.floor((contentsLength - 1) / row) + 1) {
      return alert('다음 페이지가 존재하지 않습니다.');
    }
    router.push({ pathname: router.pathname, query: newQuery });
  }, [page, contentsLength]);

  /** 다음 pages로 이동 */
  const moveToNextPages = useCallback(() => {
    let newQuery;
    if (Math.floor((page - 1) / maxSelection) * maxSelection + maxSelection + 1 <= Math.floor((contentsLength - 1) / row) + 1) {
      newQuery = changeQuery(router.query, { page: Math.floor((page - 1) / maxSelection) * maxSelection + maxSelection + 1 });
      router.push({ pathname: router.pathname, query: newQuery });
    } else if (page < Math.floor((contentsLength - 1) / row) + 1) {
      newQuery = changeQuery(router.query, { page: Math.floor((contentsLength - 1) / row) + 1 });
      router.push({ pathname: router.pathname, query: newQuery });
    } else if (page === Math.floor((contentsLength - 1) / row) + 1) {
      return alert('다음 페이지가 존재하지 않습니다.');
    }
    router.push({ pathname: router.pathname, query: newQuery });
  }, [page, contentsLength]);

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