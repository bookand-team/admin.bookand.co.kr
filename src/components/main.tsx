import { ReactNode } from 'react';

import Gnb from './gnb';

type Props = {
  children: ReactNode;
};

const Main = ({ children }: Props) => {
  return (
    <>
      <Gnb />
      <main>
        {children}
      </main>
    </>
  );
};

export default Main;