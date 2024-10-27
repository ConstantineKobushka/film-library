import { useState, useEffect } from 'react';

import MovieList from '../../components/MovieList/MovieList';

import { getTrendingMovies } from '../../api/moviesApi';

import css from './HomePage.module.css';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: '' });

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await getTrendingMovies();
        const data = response.results;
        setTrendingMovies(data);
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
    fetchTrendingMovies();
  }, []);

  return (
    <div className={css.container}>
      <MovieList movies={trendingMovies} />
    </div>
  );
};

export default HomePage;
