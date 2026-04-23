import MovieReviewItem from '../MovieReviewItem/MovieReviewItem';

const SerialReviewsList = ({ reviews }) => {
  return (
    <ul>
      {Array.isArray(reviews) &&
        reviews.map(review => (
          <MovieReviewItem
            key={review.id}
            author={review.author}
            content={review.content}
            created_at={review.created_at}
            avatar_path={review.author_details.avatar_path}
          />
        ))}
    </ul>
  );
};

export default SerialReviewsList;
