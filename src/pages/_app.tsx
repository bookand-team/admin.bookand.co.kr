import { AppProps } from 'next/app';

import GlobalHeader from '@components/common/header/global';
import Seo from '@components/common/seo';
import wrapper from '@redux/store';
import '@styles/global.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Seo />
      <GlobalHeader />
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default wrapper.withRedux(App);