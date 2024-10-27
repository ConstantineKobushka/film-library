import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMoviesReviews } from '../../api/moviesApi';

import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const [reviewsMovies, setReviewsMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: false, errorMessage: '' });

  const { movieId } = useParams();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await getMoviesReviews(movieId);
        const data = response.results;
        setReviewsMovies(data);
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
  }, [movieId]);

  return (
    <>
      {reviewsMovies.length > 0 &&
        reviewsMovies.map((review) => (
          <div className={css.wrapper} key={review.id}>
            <h3 className={css.title}>{review.author}</h3>
            <p className={css.text}>{review.content}</p>
          </div>
        ))}
      {reviewsMovies.length === 0 && <p>error</p>}
    </>
  );
};

export default MovieReviews;
