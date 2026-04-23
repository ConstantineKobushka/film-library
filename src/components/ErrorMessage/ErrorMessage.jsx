import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ children }) => {
  return <p className={styles.text}>{children}</p>;
};

export default ErrorMessage;
