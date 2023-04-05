import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import changeQuery from '@hooks/change_query';
import leftArrowIcon from '@images/left_arrow_icon.svg';
import leftDoubleArrowIcon from '@images/left_double_arrow_icon.svg';
import rightArrowIcon from '@images/right_arrow_icon.svg';
import rightDoubleArrowIcon from '@images/right_double_arrow_icon.svg';
import { RootState } from '@redux/reducers';
import styles from '@styles/components/common/table/management.module.scss';

type PropsType = {
  contentsLength: number;
  pageNumSize?: number;
  mobile: boolean;
};

const Pagination = ({ contentsLength, pageNumSize, mobile }: Required<PropsType>) => {
  const router = useRouter();
  const { page, row } = useSelector((state: RootState) => state.page);

  /** 화면에 표시될 page 선택 범위에 맞는 배열 생성 함수 */
  const selectionRange = useCallback(() => {
    const array = [];
    if (page) {
      for (let i = Math.floor((page - 1) / pageNumSize) * pageNumSize + 1; i <= Math.floor((page - 1) / pageNumSize) * pageNumSize + pageNumSize && i <= Math.floor((contentsLength - 1) / row) + 1; i++) {
        array.push(i);
      }
    } else {
      for (let i = 1; i <= pageNumSize && i <= Math.floor((contentsLength - 1) / row) + 1; i++) {
        array.push(i);
      }
    }
    return array;
  }, [page, contentsLength]);

  /** 이전 pages로 이동  */
  const moveToPreviousPages = useCallback(() => {
    let newQuery;
    if (page > 10) {
      newQuery = changeQuery(router.query, { page: Math.floor((page - 1) / pageNumSize) * pageNumSize });
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
    if (Math.floor((page - 1) / pageNumSize) * pageNumSize + pageNumSize + 1 <= Math.floor((contentsLength - 1) / row) + 1) {
      newQuery = changeQuery(router.query, { page: Math.floor((page - 1) / pageNumSize) * pageNumSize + pageNumSize + 1 });
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
    <nav className={styles.pagination + (mobile ? ` ${styles.sm}` : '')}>
      <button className={styles.left2} onClick={moveToPreviousPages}>
        <Image src={leftDoubleArrowIcon} alt='left double arrow icon' height={14} width={14} />
      </button>
      <button className={styles.left} onClick={moveToPreviousPage}>
        <Image src={leftArrowIcon} alt='left arrow icon' height={15} width={15} />
      </button>
      {selectionRange().map((number) => {
        if ((page === null && number === 1) || (page === number)) {
          return <button className={styles.current} key={number} onClick={moveToNumberPage(number)}>{number}</button>;
        }
        return <button key={number} onClick={moveToNumberPage(number)}>{number}</button>;
      })}
      <button className={styles.right} onClick={moveToNextPage}>
        <Image src={rightArrowIcon} alt='right arrow icon' height={15} width={15} />
      </button>
      <button className={styles.right2} onClick={moveToNextPages}>
        <Image src={rightDoubleArrowIcon} alt='right double arrow icon' height={14} width={14} />
      </button>
    </nav>
  );
};

const ResponsivePagination = ({ contentsLength, pageNumSize }: Pick<PropsType, 'contentsLength' | 'pageNumSize'>) => {
  return (
    <>
      <Pagination contentsLength={contentsLength} pageNumSize={5} mobile={true} />
      <Pagination contentsLength={contentsLength} pageNumSize={pageNumSize !== undefined ? pageNumSize : 10} mobile={false} />
    </>
  );
};

export default ResponsivePagination;