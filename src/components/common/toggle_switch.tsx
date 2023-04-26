import { useCallback, useId, useState } from 'react';

import styles from '@styles/components/common/toggle_switch.module.scss';

type PropsType = {
  status: boolean;
};

const ToggleSwitch = ({ status }: PropsType) => {
  const id = useId();

  // 토글 버튼 상태 (체크박스 체크 상태)
  const [isChecked, setIsChecked] = useState(status);

  /** 토글 버튼 동작 */
  const toggleHandler = useCallback(() => {
    setIsChecked((prev) => !prev);
  }, []);

  return (
    <span className={styles.container}>
      <input
        type='checkbox'
        className={styles.toggle}
        checked={isChecked}
        onChange={toggleHandler}
        id={id}
        hidden />
      <label htmlFor={id}>
        <span className={styles.ball} />
      </label>
    </span>
  );
};

export default ToggleSwitch;