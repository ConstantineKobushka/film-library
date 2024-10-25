import MovieList from '../../components/MovieList/MovieList';

import css from './HomePage.module.css';

const HomePage = ({ movies }) => {
  return (
    <div className={css.container}>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
