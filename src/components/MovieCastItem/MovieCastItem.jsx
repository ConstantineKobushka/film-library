import noPhoto from '../../assets/images/no-photo.jpg';

import styles from './MovieCastItem.module.css';

const MovieCastItem = ({ profile_path, name, character }) => {
  return (
    <li className={styles.item}>
      {profile_path ? (
        <img
          className={styles.img}
          src={`https://image.tmdb.org/t/p/w400/${profile_path}`}
          alt={name}
        />
      ) : (
        <img className={styles.img} src={noPhoto} alt={name} />
      )}
      <h3 className={styles.title}>{name}</h3>
      <span className={styles.text}>{character}</span>
    </li>
  );
};

export default MovieCastItem;
