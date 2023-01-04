import { useCallback, useEffect, useState } from 'react';

/**
 * 체크된 박스의 id값들의 상태 관리 함수
 * @param page 현재 페이지 번호
 * @returns [checkedBoxIds, checkBoxHandler]
 */
// eslint-disable-next-line no-unused-vars
const multiCheckBoxHandler = (page: number): [number[], (isChecked: boolean, boxId: number) => void] => {
  // 체크된 박스의 id값들 상태
  const [checkedBoxIds, setCheckedBoxIds] = useState<number[]>([]);

  // page가 변하면 체크박스 리스트 초기화
  useEffect(() => {
    setCheckedBoxIds([]);
  }, [page]);

  /** 체크박스 체크 및 체크해제 */
  const checkBoxHandler = useCallback((isChecked: boolean, boxId: number) => {
    if (isChecked) {
      setCheckedBoxIds([...checkedBoxIds, boxId]);
    } else {
      setCheckedBoxIds(checkedBoxIds.filter((checkedBoxId) => checkedBoxId !== boxId));
    }
  }, [checkedBoxIds]);

  return [checkedBoxIds, checkBoxHandler];
};

export default multiCheckBoxHandler;