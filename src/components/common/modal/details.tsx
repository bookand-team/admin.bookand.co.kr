import React, { ReactNode, useCallback, useRef } from 'react';

import styles from '@styles/components/common/modal/details.module.scss';

type PropsType = {
  id: number;
  openModalId: number | null;
  closeModal: () => void;
  children: ReactNode;
};

const DetailsModal = ({ id, openModalId, closeModal, children }: PropsType) => {
  // 모달창 선택자
  const modalRef = useRef(null);

  /** 배경 클릭에 의한 모달창 닫기 */
  const closeModalByClickBG = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (id === openModalId && modalRef.current === e.target) {
      closeModal();
    }
  }, [openModalId, modalRef.current]);

  if (id !== openModalId) return <></>;
  return (
    <div className={styles.background} ref={modalRef} onClick={closeModalByClickBG}>
      {children}
    </div>
  );
};

export default DetailsModal;