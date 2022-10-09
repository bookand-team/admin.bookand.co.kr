import Header from '../components/header';
import wrapper from '../redux/store';
import '../styles/global.css';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(App);