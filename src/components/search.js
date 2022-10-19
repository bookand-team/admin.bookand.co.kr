import styles from '../styles/search.module.css';

const Search = ({ search }) => {
  return (
    <div className={styles.container}>
      <div>
        <div>{search}</div>
        <input />
      </div>
      <button>검색</button>
    </div>
  );
};

export default Search;