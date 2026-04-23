import toast, { Toaster } from 'react-hot-toast';

import styles from './SearchForm.module.css';

const notify = () =>
  toast.error('Write a word to search for', {
    duration: 3000,
    position: 'top-right',
  });

const SearchForm = ({ onSubmit }) => {
  const onFormSubmit = event => {
    event.preventDefault();
    const searchValue = event.currentTarget.elements.search.value
      .trim()
      .toLowerCase();
    if (searchValue === '') {
      notify();
      return;
    }
    onSubmit({ query: searchValue });
    event.currentTarget.reset();
  };

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <input
        className={styles.input}
        type="text"
        name="search"
        autoComplete="off"
        autoFocus
        placeholder="Пошук фільму..."
      />
      <button className={styles.btn} type="submit">
        Пошук
      </button>
      <Toaster />
    </form>
  );
};

export default SearchForm;
