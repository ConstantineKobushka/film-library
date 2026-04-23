import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import Title from '../Title/Title';
import SerialReviewsList from '../SerialReviewsList/SerialReviewsList';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { getSerialReviews } from '../../api/moviesApi';

const SerialReviews = () => {
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: '' });
  const { serialId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setError(prevState => ({
          ...prevState,
          isError: false,
          errorMessage: '',
        }));
        const data = await getSerialReviews(serialId);
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
  }, [serialId]);

  return (
    <>
      <Title>Відгуки</Title>
      {!isLoading && Array.isArray(reviews) && reviews?.length > 0 && (
        <SerialReviewsList reviews={reviews} />
      )}
      {isLoading && <Loader />}
      {error.isError && <ErrorMessage>{error.errorMessage}</ErrorMessage>}
      {reviews?.length === 0 && <Title>Інформація не знайдена</Title>}
    </>
  );
};

export default SerialReviews;
