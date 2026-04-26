import { useEffect, useState } from 'react';
// import { useRef } from 'react';

import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';

import GoBack from '../GoBack/GoBack';
import MovieRating from '../MovieRating/MovieRating';
import TrailerModal from '../TrailerModal/TrailerModal';
import Overlay from '../Overlay/Overlay';

import { getNumericDate, getYear } from '../../utils/formatDate';
import { formatTime } from '../../utils/formatTime';

import styles from './MovieDetailsItem.module.css';

const MovieDetailsItem = ({ movieDetails, trailerKey }) => {
  const {
    poster_path,
    title,
    overview,
    release_date,
    origin_country,
    runtime,
    genres,
    backdrop_path,
    vote_average,
  } = movieDetails;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const backLink = location.state?.from ?? '/';
  const goBackHandler = () => navigate(backLink);

  // const backLink = useRef(location?.state?.from || '/');
  // const goBackHandler = () => navigate(backLink.current);
  // <NavLink to="cast" state={{ from: backLink.current }}></NavLink>
  // <NavLink to="reviews" state={{ from: backLink.current }}></NavLink>

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [modalIsOpen]);

  const openTrailerModal = () => {
    setModalIsOpen(true);
  };

  const closeTrailerModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <GoBack goBackHandler={goBackHandler}>Назад</GoBack>
      <div
        className={styles.wparrer}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
        }}
      >
        <div className={styles.inner}>
          <div className={styles.poster}>
            <img
              className={styles.img}
              src={`https://image.tmdb.org/t/p/w400/${poster_path}`}
              alt={title}
            />
          </div>
          <div className={styles.info}>
            <div className={styles.top}>
              <h2 className={styles.title}>
                {title}
                <span className={styles.year}> ({getYear(release_date)})</span>
              </h2>
              <ul className={styles.list}>
                <li className={styles.item}>{getNumericDate(release_date)}</li>
                <li className={styles.item}>Країна: {origin_country}</li>
                <li className={styles.item}>{formatTime(runtime)}</li>
              </ul>
              <ul className={styles.genres}>
                {Array.isArray(genres) &&
                  genres.map(({ id, name }) => (
                    <li className={styles.item} key={id}>
                      {name}
                    </li>
                  ))}
              </ul>
            </div>

            <MovieRating voteAverage={vote_average} />

            <button
              className={styles.link}
              type="button"
              onClick={openTrailerModal}
            >
              Відтворити трейлер
            </button>

            <div className={styles.description}>
              <h3 className={styles.headline}>Опис</h3>
              <p className={styles.text}>{overview}</p>
            </div>
            <div className={styles.navigation}>
              <NavLink
                className={({ isActive }) =>
                  clsx(styles.navLink, isActive && styles.active)
                }
                to="cast"
                state={{ from: backLink }}
              >
                Актори
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  clsx(styles.navLink, isActive && styles.active)
                }
                to="reviews"
                state={{ from: backLink }}
              >
                Відгуки
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {modalIsOpen && (
          <Overlay closeTrailerModal={closeTrailerModal}>
            <TrailerModal
              closeTrailerModal={closeTrailerModal}
              trailerKey={trailerKey}
            />
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default MovieDetailsItem;
