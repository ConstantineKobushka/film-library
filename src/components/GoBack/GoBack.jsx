import styles from './GoBack.module.css';

const GoBack = ({ goBackHandler }) => {
  return (
    <button className={styles.btn} type="button" onClick={goBackHandler}>
      Назад
    </button>
  );
};

export default GoBack;
