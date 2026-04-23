import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import Section from '../../components/Section/Section';
import Container from '../../components/Container/Container';
import MoviesList from '../../components/MoviesList/MoviesList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import { getTrendingMovies } from '../../api/moviesApi';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: '' });
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError({
          isError: false,
          errorMessage: '',
        });
        const data = await getTrendingMovies({
          signal: controller.signal,
        });
        setTrendingMovies(data.results);
      } catch (error) {
        if (error.name === 'AbortError') return;

        setError({
          isError: true,
          errorMessage: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();

    return () => controller.abort();
  }, []);

  return (
    <main>
      <Section>
        <Container>
          {!isLoading &&
            Array.isArray(trendingMovies) &&
            trendingMovies?.length > 0 && (
              <MoviesList
                movies={trendingMovies}
                state={{
                  from: location,
                }}
              />
            )}
          {isLoading && <Loader />}
          {error.isError && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
        </Container>
      </Section>
    </main>
  );
};

export default HomePage;
