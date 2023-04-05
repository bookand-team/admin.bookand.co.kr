import { nanoid } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { isRowInsufficient, makeEmptyArray } from '@hooks/maintain_table_layout';
import { RootState } from '@redux/reducers';
import styles from '@styles/components/common/table/management.module.scss';

type PropsType = {
  children: ReactNode;
  contentsLength: number | null;
};

const ManagementTableBody = ({ children, contentsLength }: PropsType) => {
  const { page, row } = useSelector((state: RootState) => state.page);

  return (
    <div className={styles.tbody}>
      {children}
      {(contentsLength && isRowInsufficient(page, row, contentsLength)) &&
        makeEmptyArray(page, row, contentsLength).map(() => {
          return <li key={nanoid()} className={styles.tr} />;
        })}
    </div>
  );
};

export default ManagementTableBody;