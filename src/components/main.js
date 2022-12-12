import Gnb from './gnb';

const Main = ({ children }) => {
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