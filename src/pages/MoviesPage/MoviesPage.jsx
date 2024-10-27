import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

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
  // const [searchMovies, setSearchMovies] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: '' });
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get('query');
  const location = useLocation();

  function onSubmitHandler(e) {
    e.preventDefault();
    if (e.target.elements.search.value.trim() === '') {
      notify();
      return;
    }
    const searchValue = e.target.elements.search.value;
    // setSearchMovies(searchValue);
    setSearchParams({ query: searchValue });
    e.target.reset();
  }

  useEffect(() => {
    if (!searchValue) return;
    const fetchSearchMovies = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await getSearchMovies(searchValue);
        const data = response.results;
        setFoundMovies(data);
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
  }, [searchValue]);

  return (
    <section className={css.section}>
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
      <MovieList movies={foundMovies} state={location} />
    </section>
  );
};

export default MoviesPage;
