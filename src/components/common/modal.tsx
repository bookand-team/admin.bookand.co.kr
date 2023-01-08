import React, { ReactNode, useCallback, useRef } from 'react';

import styles from '@styles/modal.module.css';

type Props = {
  children: ReactNode;
  id: number;
  openModalId: number | null;
  setOpenModalId: React.Dispatch<React.SetStateAction<number | null>>;
};

const Modal = ({ children, id, openModalId, setOpenModalId }: Props) => {
  const modalRef = useRef(null);

  const closeModal = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (id === openModalId && modalRef.current === e.target) {
      setOpenModalId(null);
    }
  }, [openModalId, modalRef.current]);

  return (
    <div className={id === openModalId ? `${styles.container} ${styles.opend}` : styles.container} ref={modalRef} onClick={closeModal}>
      {children}
    </div>
  );
};

export default Modal;