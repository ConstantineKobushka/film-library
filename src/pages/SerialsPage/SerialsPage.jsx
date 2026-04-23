import { useEffect, useState } from 'react';

import { useLocation, useSearchParams } from 'react-router-dom';

import Section from '../../components/Section/Section';
import Container from '../../components/Container/Container';
import SearchForm from '../../components/SearchForm/SearchForm';
import SerialsList from '../../components/SerialsList/SerialsList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import { getSerialsByQuery } from '../../api/moviesApi';

const SerialsPage = () => {
  const loadFromStorage = (key, fallback) => {
    try {
      const data = localStorage.getItem(key);
      if (!data) return fallback;

      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  };

  const [foundMovies, setFoundMovies] = useState(() =>
    loadFromStorage('serials', null)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: '' });
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const location = useLocation();

  useEffect(() => {
    if (!query) return;

    const controller = new AbortController();

    const fetchSerials = async () => {
      try {
        setIsLoading(true);
        setError(prevState => ({
          ...prevState,
          isError: false,
          errorMessage: '',
        }));
        const { results } = await getSerialsByQuery(query, {
          signal: controller.signal,
        });
        setFoundMovies(results);
        localStorage.setItem('serials', JSON.stringify(results));
      } catch (error) {
        if (error.name === 'AbortError') return;

        setError(prevState => ({
          ...prevState,
          isError: true,
          errorMessage: error.message,
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchSerials();

    return () => controller.abort();
  }, [query]);

  const onSubmitHandler = searchValue => {
    setSearchParams(searchValue);
  };

  return (
    <main>
      <Section>
        <Container>
          <SearchForm onSubmit={onSubmitHandler} />
          {!isLoading &&
            Array.isArray(foundMovies) &&
            foundMovies?.length > 0 && (
              <SerialsList
                movies={foundMovies}
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

export default SerialsPage;
