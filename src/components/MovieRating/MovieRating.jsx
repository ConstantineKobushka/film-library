import styles from './MovieRating.module.css';

const MovieRating = ({ voteAverage = 6.9 }) => {
  const score = Math.round(voteAverage * 10);

  const radius = 34;
  const stroke = 5;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 70) return '#21d07a';
    if (score >= 50) return '#eab308';
    return '#db2360';
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.circle}>
        <svg className={styles.svg}>
          {/* outer dark ring */}
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            stroke="#081c22"
            strokeWidth={stroke}
            fill="#0f172a "
          />

          {/* progress background */}
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            stroke="#204529"
            strokeWidth={stroke}
            fill="transparent"
          />

          {/* progress line */}
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            stroke={getColor()}
            strokeWidth={stroke}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>

        <div className={styles.value}>
          {score}
          <span>%</span>
        </div>
      </div>

      <p className={styles.label}>
        Оцінка
        <br />
        користувачів
      </p>
    </div>
  );
};

export default MovieRating;
