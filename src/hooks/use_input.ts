import React, { useCallback, useState } from 'react';

/**
 * input 태그의 value의 상태 관리 함수
 * @param initialValue 초기값
 * @returns [value, changeValue, setValue]
 */
// eslint-disable-next-line no-unused-vars
export const useInputText = (initialValue: string): [string, (event: React.ChangeEvent<HTMLInputElement>) => void, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState(initialValue);
  const changeValue = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);
  return [value, changeValue, setValue];
};

/**
 * input 태그의 checked의 상태 관리 함수
 * @param initialChecked 초기값
 * @returns [checked, changeChecked, setChecked]
 */
// eslint-disable-next-line no-unused-vars
export const useInputCheckbox = (initialChecked: boolean): [boolean, (event: React.ChangeEvent<HTMLInputElement>) => void, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [checked, setChecked] = useState(initialChecked);
  const changeChecked = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  }, []);
  return [checked, changeChecked, setChecked];
};

/**
 * select 태그의 value의 상태 관리 함수
 * @param initialValue 초기값
 * @returns [value, changeValue, setValue]
 */
// eslint-disable-next-line no-unused-vars
export const useSelect = (initialValue: string): [string, (event: React.ChangeEvent<HTMLSelectElement>) => void, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState(initialValue);
  const changeValue = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  }, []);
  return [value, changeValue, setValue];
};