import styles from '../styles/page.module.css';

const Page = () => {
  return (
    <nav className={styles.page}>
      <button>{'<<'}</button>
      <button>{'<'}</button>
      <button className={styles.current}>{'1'}</button>
      <button>{'2'}</button>
      <button>{'3'}</button>
      <button>{'4'}</button>
      <button>{'5'}</button>
      <button>{'>'}</button>
      <button>{'>>'}</button>
    </nav>
  );
};

export default Page;