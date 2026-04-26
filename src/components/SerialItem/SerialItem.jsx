import { Link } from 'react-router-dom';

import { getPrettyDate } from '../../utils/formatDate';

import styles from './SerialItem.module.css';

const SerialItem = ({ state, id, poster_path, title, release_date }) => {
  return (
    <li className={styles.item}>
      <div className={styles.wrapper}>
        <img
          className={styles.img}
          src={`https://image.tmdb.org/t/p/w400/${poster_path}`}
          alt={title}
          loading="lezy"
        />
      </div>
      <div className={styles.descr}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>
          Дата виходу:{' '}
          <span className={styles.span}>{getPrettyDate(release_date)}</span>
        </p>
      </div>
      <Link className={styles.link} to={`/serials/${id}`} state={state} />
    </li>
  );
};

export default SerialItem;
