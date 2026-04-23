import SerialItem from '../SerialItem/SerialItem';

import styles from './SerialsList.module.css';

const SerialsList = ({ movies, state }) => {
  return (
    <ul className={styles.list}>
      {Array.isArray(movies) &&
        movies.map(movie => (
          <SerialItem
            key={movie.id}
            state={state}
            id={movie.id}
            poster_path={movie.poster_path}
            title={movie.name}
            release_date={movie.first_air_date}
          />
        ))}
    </ul>
  );
};

export default SerialsList;
