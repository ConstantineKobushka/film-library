import { useEffect, useState } from 'react';

import { Outlet, useParams } from 'react-router-dom';

import Section from '../../components/Section/Section';
import Container from '../../components/Container/Container';
import MovieDetailsItem from '../../components/MovieDetailsItem/MovieDetailsItem';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';

import { getMovieById, getMovieTraler } from '../../api/moviesApi';

const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTreilerKey] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: '' });
  const { movieId } = useParams();

  useEffect(() => {
    let isMounted = true;

    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError({
          isError: false,
          errorMessage: '',
        });
        const [movieData, trailerData] = await Promise.all([
          getMovieById(movieId),
          getMovieTraler(movieId),
        ]);

        if (!isMounted) return;

        setMovieDetails(movieData);
        const key =
          trailerData?.results?.find(
            item => item.site === 'YouTube' && item.type === 'Trailer'
          )?.key ||
          trailerData?.results?.[0]?.key ||
          null;
        setTreilerKey(key);
      } catch (error) {
        if (!isMounted) return;

        setError({
          isError: true,
          errorMessage: error.message || 'Помилка завантаження',
        });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchMovieDetails();

    return () => {
      isMounted = false;
    };
  }, [movieId]);

  return (
    <>
      <Section>
        <Container>
          {!isLoading && movieDetails && (
            <MovieDetailsItem
              movieDetails={movieDetails}
              trailerKey={trailerKey}
            />
          )}
          {isLoading && <Loader />}
          {error.isError && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
          <Outlet />
        </Container>
      </Section>
    </>
  );
};

export default MovieDetailsPage;
