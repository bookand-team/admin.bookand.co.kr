import { nanoid } from '@reduxjs/toolkit';
import React, { useCallback, useRef } from 'react';

import styles from '@styles/components/common/modal/alert.module.scss';

type PropsType = {
  status: boolean;
  closeModal: () => void;
  title: string;
  content: string[];
  function_btn_name?: string;
  function_btn_handler?: () => void;
  warning?: boolean;
  default_btn_name: string;
  default_btn_handler?: () => void;
};

const AlertModal = ({ status, closeModal, title, content, function_btn_name, function_btn_handler, warning = false, default_btn_name, default_btn_handler }: PropsType) => {
  // 모달창 배경영역 선택자
  const backgroundRef = useRef(null);

  /** 배경 클릭에 의한 모달창 닫기 */
  const closeModalByClickBG = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (backgroundRef.current === e.target) {
      closeModal();
    }
  }, [backgroundRef.current]);

  if (!status) return <></>;
  return (
    <div className={styles.background} ref={backgroundRef} onClick={closeModalByClickBG}>
      <section className={styles.container}>
        <header>{title}</header>
        <div>
          {content.map((sentence) => {
            return (<p key={nanoid()}>{sentence}</p>);
          })}
        </div>
        <nav>
          {function_btn_name && <button className={warning ? styles.warning : undefined} onClick={function_btn_handler}>{function_btn_name}</button>}
          <button className={styles.default} onClick={default_btn_handler ? default_btn_handler : closeModal}>{default_btn_name}</button>
        </nav>
      </section>
    </div>
  );
};

export default AlertModal;