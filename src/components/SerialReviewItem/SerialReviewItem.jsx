import ReactMarkdown from 'react-markdown';

import { getPrettyDate } from '../../utils/formatDate';

import noAvatar from '../../assets/images/no-avatar.png';

import styles from './SerialReviewItem.module.css';

const SerialReviewItem = ({ author, content, created_at, avatar_path }) => {
  return (
    <li className={styles.item}>
      <div className={styles.wrapper}>
        {avatar_path ? (
          <img
            className={styles.img}
            src={`https://image.tmdb.org/t/p/w400/${avatar_path}`}
            alt={author}
          />
        ) : (
          <img className={styles.img} src={noAvatar} alt={author} />
        )}
        <div className={styles.author}>
          <h3 className={styles.title}>A review by {author}</h3>
          <p className={styles.info}>
            Written by <strong>{author}</strong> on{' '}
            <strong>{getPrettyDate(created_at)}</strong>
          </p>
        </div>
      </div>
      <div className={styles.text}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </li>
  );
};

export default SerialReviewItem;
