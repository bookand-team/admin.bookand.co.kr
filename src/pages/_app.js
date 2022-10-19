import Header from '../components/header';
import Seo from '../components/seo';
import wrapper from '../redux/store';
import '../styles/global.css';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Seo />
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(App);