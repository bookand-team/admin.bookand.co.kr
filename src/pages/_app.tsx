import Header from '../components/header';
import Seo from '../components/seo';
import wrapper from '../redux/store';

import '../styles/global.css';

import type { AppProps } from 'next/app';

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