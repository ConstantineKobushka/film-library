import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import Title from '../Title/Title';
import MovieReviewsList from '../MovieReviewsList/MovieReviewsList';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { getMovieReviews } from '../../api/moviesApi';

const MovieReviews = () => {
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: '' });
  const { movieId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setError(prevState => ({
          ...prevState,
          isError: false,
          errorMessage: '',
        }));
        const data = await getMovieReviews(movieId);
        setReviews(data.results);
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

    fetchReviews();
  }, [movieId]);

  return (
    <>
      <Title>Відгуки</Title>
      {!isLoading && Array.isArray(reviews) && reviews?.length > 0 && (
        <MovieReviewsList reviews={reviews} />
      )}
      {isLoading && <Loader />}
      {error.isError && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
      {reviews?.length === 0 && <Title>Інформація не знайдена</Title>}
    </>
  );
};

export default MovieReviews;
