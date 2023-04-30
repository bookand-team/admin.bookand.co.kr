import { ReactNode } from 'react';

import styles from '@styles/components/common/table/management.module.scss';

type PropsType = {
  children: ReactNode;
};

const ManagementTableBody = ({ children }: PropsType) => {
  return (
    <div className={styles.tbody}>
      {children}
    </div>
  );
};

export default ManagementTableBody;