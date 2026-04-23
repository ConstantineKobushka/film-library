import { motion } from 'framer-motion';

import closeBtn from '/icons/close-btn.svg';

import styles from './TrailerModal.module.css';

const TrailerModal = ({ closeTrailerModal, trailerKey }) => {
  return (
    <motion.div
      className={styles.modal}
      onClick={e => e.stopPropagation()}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className={styles.top}>
        <h2 className={styles.title}>Відтворити трейлер</h2>

        <button className={styles.btn} onClick={closeTrailerModal}>
          <img src={closeBtn} alt="close" />
        </button>
      </div>

      <iframe
        className={styles.frame}
        src={`https://www.youtube.com/embed/${trailerKey}`}
        title="Trailer"
        allowFullScreen
      />
    </motion.div>
  );
};

export default TrailerModal;
