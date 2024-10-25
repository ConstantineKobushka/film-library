import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Navigation from './components/Navigation/Navigation';
import HomePage from './pages/HomePage/HomePage';
import MoviesPage from './pages/MoviesPage/MoviesPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import { getTrendingMovies } from './api/moviesApi';

function App() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: '' });

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await getTrendingMovies();
        const data = response.results;
        // setMovies(data);
        console.log(movies);
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
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage movies={movies} />} />
        <Route path='/movies' element={<MoviesPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
