import MovieItem from '../MovieItem/MovieItem';

import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  return (
    <ul className={css.list}>
      {movies !== null &&
        movies.map((movie) => (
          <MovieItem
            key={movie.id}
            id={movie.id}
            poster_path={movie.poster_path}
            title={movie.title}
            release_date={movie.release_date}
          />
        ))}
    </ul>
  );
};

export default MovieList;
