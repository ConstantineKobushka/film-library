import { Link } from 'react-router-dom';

import { getPrettyDate } from '../../utils/formatDate';

import styles from './MovieItem.module.css';

const MovieItem = ({ state, id, poster_path, title, release_date }) => {
  return (
    <li className={styles.item}>
      <img
        className={styles.img}
        src={`https://image.tmdb.org/t/p/w400/${poster_path}`}
        alt={title}
        loading="lezy"
      />
      <div className={styles.descr}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>
          Дата виходу:{' '}
          <span className={styles.span}>{getPrettyDate(release_date)}</span>
        </p>
      </div>
      <Link className={styles.link} to={`/movies/${id}`} state={state} />
    </li>
  );
};

export default MovieItem;
