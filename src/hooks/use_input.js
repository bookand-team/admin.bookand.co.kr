import { useCallback, useState } from 'react';

/**
 * input태그 value값의 state 관리를 위한 함수
 * @param {string} initialValue state 초기값
 * @returns [현재 value, event에 의한 value 변경 함수, value 변경 함수]
 */
const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const changeValue = useCallback((event) => {
    setValue(event.target.value);
  }, []);
  return [value, changeValue, setValue];
};

export default useInput;