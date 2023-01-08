import { AppProps } from 'next/app';

import Header from '@components/common/header';
import Seo from '@components/common/seo';
import wrapper from '@redux/store';
import '@styles/global.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Seo />
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(App);