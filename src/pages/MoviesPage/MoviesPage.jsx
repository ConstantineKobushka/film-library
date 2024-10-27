import { useState, useEffect } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import MovieList from '../../components/MovieList/MovieList';

import { getSearchMovies } from '../../api/moviesApi';

import css from './MoviesPage.module.css';

const notify = () =>
  toast.error('Write a word to search for', {
    duration: 3000,
    position: 'top-right',
  });

const MoviesPage = () => {
  const [foundMovies, setFoundMovies] = useState(null);
  const [searchMovies, setSearchMovies] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: '' });

  useEffect(() => {
    if (!searchMovies) return;
    const fetchSearchMovies = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await getSearchMovies(searchMovies);
        console.log(response);
        const data = response.results;
        setFoundMovies(data);
        console.log(foundMovies);
      } catch (error) {
        setError((prevState) => {
          return {
            ...prevState,
            errorMessage: error.message,
            isError: true,
          };
        });
      } finally {
        setLoading(false);
      }
    };
    fetchSearchMovies();
  }, [searchMovies]);

  function onSubmitHandler(e) {
    e.preventDefault();
    if (e.target.elements.search.value.trim() === '') {
      notify();
      return;
    }
    const searchValue = e.target.elements.search.value;
    setSearchMovies(searchValue);
    e.target.reset();
  }

  return (
    <>
      <form className={css.searchForm} onSubmit={onSubmitHandler}>
        <input
          className={css.searchInput}
          type='text'
          name='search'
          autoComplete='off'
          autoFocus
          placeholder='Search movies'
        />
        <button className={css.searchBtn} type='submit'>
          🔍
        </button>
        <Toaster />
      </form>
      <MovieList movies={foundMovies} />
    </>
  );
};

export default MoviesPage;
