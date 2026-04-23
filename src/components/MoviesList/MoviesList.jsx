import MovieItem from '../MovieItem/MovieItem';

import styles from './MoviesList.module.css';

const MoviesList = ({ movies, state }) => {
  return (
    <ul className={styles.list}>
      {Array.isArray(movies) &&
        movies.map(movie => (
          <MovieItem
            key={movie.id}
            state={state}
            id={movie.id}
            poster_path={movie.poster_path}
            title={movie.title}
            release_date={movie.release_date || movie.first_air_date}
          />
        ))}
    </ul>
  );
};

export default MoviesList;
