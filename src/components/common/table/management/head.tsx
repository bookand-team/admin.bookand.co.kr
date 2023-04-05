import { ReactNode } from 'react';

import styles from '@styles/components/common/table/management.module.scss';

type PropsType = {
  children: ReactNode;
};

const ManagementTableHead = ({ children }: PropsType) => {
  return (
    <div className={styles.thead}>
      {children}
    </div>
  );
};

export default ManagementTableHead;