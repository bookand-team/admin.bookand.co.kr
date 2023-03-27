import { AppProps } from 'next/app';

import Gnb from '@components/common/gnb';
import Header from '@components/common/header';
import Seo from '@components/common/seo';
import wrapper from '@redux/store';
import '@styles/global.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Seo />
      <Header />
      <Gnb />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default wrapper.withRedux(App);