import { ScaleLoader } from 'react-spinners';

import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.barsWrapper}>
      <ScaleLoader color="#4fa94d" />
    </div>
  );
};
export default Loader;
