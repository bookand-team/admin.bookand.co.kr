import { ReactNode } from 'react';

import ResponsivePagination from '@components/common/table/management/pagination';
import styles from '@styles/components/common/table/management.module.scss';

type PropsType = {
  head: ReactNode;
  body: ReactNode;
  contentsLength: number | null;
};

const ManagementTable = ({ head, body, contentsLength }: PropsType) => {
  return (
    <div className={styles.container}>
      <div className={styles.table}>
        {head}
        {body}
      </div>
      {contentsLength !== null
        ? <ResponsivePagination contentsLength={contentsLength} />
        : null
      }
    </div>
  );
};

export default ManagementTable;