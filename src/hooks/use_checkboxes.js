import { useCallback, useEffect, useState } from 'react';

/**
 * 현재 페이지의 체크된 박스들의 id값을 state로 관리
 * @param {number} page 현재 페이지 번호
 * @returns [checkBoxes, checkBoxHandler]: [체크된 박스 id값들 배열 state, 체크박스 state 변경함수(isChecked, boxId)]
 */
const useCheckBoxes = (page) => {
  // 체크된 박스들의 id값을 담는 리스트 state
  const [checkBoxes, setCheckBoxes] = useState([]);

  // page가 변하면 체크박스 리스트 초기화
  useEffect(() => {
    setCheckBoxes([]);
  }, [page]);

  /** 체크박스 체크 및 체크해제 */
  const checkBoxHandler = useCallback((isChecked, boxId) => {
    if (isChecked) {
      setCheckBoxes([...checkBoxes, boxId]);
    } else {
      setCheckBoxes(checkBoxes.filter((checkedBoxId) => checkedBoxId !== boxId));
    }
  }, [checkBoxes]);

  return [checkBoxes, checkBoxHandler];
};

export default useCheckBoxes;