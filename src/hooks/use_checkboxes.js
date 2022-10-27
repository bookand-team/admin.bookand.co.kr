import { useCallback, useEffect, useState } from 'react';

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