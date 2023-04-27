import { useCallback, useState } from 'react';

/** [열린 상세정보 모달창 번호, 모달창 열기, 모달창 닫기] */
export const useDetailsModal = (): [number | null, (id: number) => () => void, () => void] => {
  // 열려있는 상세정보 모달창 번호
  const [openModalId, setOpenModalId] = useState<number | null>(null);

  /** 모달창 열기 */
  const openModal = useCallback((id: number) => () => {
    setOpenModalId(id);
  }, []);

  /** 모달창 닫기 */
  const closeModal = useCallback(() => {
    setOpenModalId(null);
  }, []);

  return [openModalId, openModal, closeModal];
};