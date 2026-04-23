import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import Title from '../Title/Title';
import MovieCastList from '../MovieCastList/MovieCastList';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { getMovieCast } from '../../api/moviesApi';

const MovieCast = () => {
  const [actors, setActors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: '' });
  const { movieId } = useParams();

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setIsLoading(true);
        setError(prevState => ({
          ...prevState,
          isError: false,
          errorMessage: '',
        }));
        const data = await getMovieCast(movieId);
        setActors(data.cast);
      } catch (error) {
        setError(prevState => ({
          ...prevState,
          isError: true,
          errorMessage: error.message,
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <>
      <Title>Актори у головних ролях</Title>
      {!isLoading && Array.isArray(actors) && actors?.length > 0 && (
        <MovieCastList actors={actors} />
      )}
      {isLoading && <Loader />}
      {error.isError && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
      {actors?.length === 0 && <Title>Інформація не знайдена</Title>}
    </>
  );
};

export default MovieCast;
