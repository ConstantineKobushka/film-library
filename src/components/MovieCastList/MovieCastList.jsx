import MovieCastItem from '../MovieCastItem/MovieCastItem';

import styles from './MovieCastList.module.css';

const MovieCastList = ({ actors }) => {
  return (
    <ul className={styles.list}>
      {Array.isArray(actors) &&
        actors.map(actor => (
          <MovieCastItem
            key={actor.id}
            id={actor.id}
            profile_path={actor.profile_path}
            name={actor.name}
            original_name={actor.original_name}
            character={actor.character}
          />
        ))}
    </ul>
  );
};

export default MovieCastList;
