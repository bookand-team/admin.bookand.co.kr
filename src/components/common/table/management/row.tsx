import { ReactNode } from 'react';

import styles from '@styles/components/common/table/management.module.scss';

type PropsType = {
  children: ReactNode;
  checked?: boolean;
};

const ManagementTableRow = ({ children, checked }: PropsType) => {
  return (
    <li className={styles.tr + (checked ? ` ${styles.checked}` : '')} >
      {children}
    </li >
  );
};

export default ManagementTableRow;