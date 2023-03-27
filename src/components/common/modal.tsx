import React, { ReactNode, useCallback, useRef } from 'react';

import styles from '@styles/components/common/modal.module.scss';

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
    <>
      {id === openModalId &&
        <div className={styles.background} ref={modalRef} onClick={closeModal}>
          {children}
        </div>
      }
    </>
  );
};

export default Modal;