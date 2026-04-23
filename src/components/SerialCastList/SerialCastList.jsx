import SerialCastItem from '../SerialCastItem/SerialCastItem';

import styles from './SerialCastList.module.css';

const SerialCastList = ({ actors }) => {
  return (
    <ul className={styles.list}>
      {Array.isArray(actors) &&
        actors.map(actor => (
          <SerialCastItem
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

export default SerialCastList;
