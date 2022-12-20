import { useCallback, useRef } from 'react';

import styles from '../styles/modal.module.css';

const Modal = ({ children, id, openModalId, setOpenModalId }) => {
  const modalRef = useRef(null);

  const closeModal = useCallback((event) => {
    if (id === openModalId && modalRef.current === event.target) {
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