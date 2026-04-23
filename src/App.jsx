import { Suspense, lazy } from 'react';

import { Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(
  () => import('./pages/MovieDetailsPage/MovieDetailsPage')
);
const SerialsPage = lazy(() => import('./pages/SerialsPage/SerialsPage'));
const SerialsDetailsPage = lazy(
  () => import('./pages/SerialsDetailsPage/SerialsDetailsPage')
);
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

import Layout from './components/Layout/Layout';
import Loader from './components/Loader/Loader';
import MovieCast from './components/MovieCast/MovieCast';
import MovieReviews from './components/MovieReviews/MovieReviews';
import SerialCast from './components/SerialCast/SerialCast';
import SerialReviews from './components/SerialReviews/SerialReviews';

function App() {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/serials" element={<SerialsPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="/serials/:serialId" element={<SerialsDetailsPage />}>
            <Route path="cast" element={<SerialCast />} />
            <Route path="reviews" element={<SerialReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
