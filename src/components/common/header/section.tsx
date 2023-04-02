import { ReactNode } from 'react';

import styles from '@styles/components/common/header/section.module.scss';

interface PropsType {
  title: string;
  right?: ReactNode;
}

const SectionHeader = ({ title, right }: PropsType) => {
  return (
    <header className={styles.header}>
      <h1>{title}</h1>
      {right}
    </header>
  );
};

export default SectionHeader;