import axios from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmNiM2Q2N2Y2ZTA2NjQ4NTFkYmE4MTFlMWRiYTcyYyIsIm5iZiI6MTc3NjE2Njg5NC40ODUsInN1YiI6IjY5ZGUyN2VlZDY4OGJjYTJkOWI2NjE5ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NXpX3UHnL9c2FWOpdw-VQMuIwbd-_vCWG2OqbNjJ1G0';

const moviesInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer ${token}`,
    accept: 'application/json',
  },
  params: {
    include_adult: false,
    // language: 'en-US',
    language: 'uk-UA',
  },
});

export const getTrendingMovies = async () => {
  const { data } = await moviesInstance.get('/trending/movie/day');
  return data;
};

export const getMoviesByQuery = async query => {
  const { data } = await moviesInstance.get('/search/movie', {
    params: {
      query,
    },
  });
  return data;
};

export const getMovieById = async id => {
  const { data } = await moviesInstance.get(`movie/${id}`);
  return data;
};

export const getMovieCast = async id => {
  const { data } = await moviesInstance.get(`movie/${id}/credits`);
  return data;
};

export const getMovieReviews = async id => {
  const { data } = await moviesInstance.get(`movie/${id}/reviews`);
  return data;
};

export const getSerialsByQuery = async query => {
  const { data } = await moviesInstance.get('/search/tv', {
    params: {
      query,
    },
  });
  return data;
};

export const getSerialById = async id => {
  const { data } = await moviesInstance.get(`tv/${id}`);
  return data;
};

export const getSerialCast = async id => {
  const { data } = await moviesInstance.get(`tv/${id}/credits`);
  return data;
};

export const getSerialReviews = async id => {
  const { data } = await moviesInstance.get(`tv/${id}/reviews`);
  return data;
};

export const getMovieTraler = async (id, language = 'uk-UA') => {
  const { data } = await moviesInstance.get(`movie/${id}/videos`, {
    params: {
      language,
    },
  });
  return data;
};

export const getSerialTrailer = async (id, language = 'uk-UA') => {
  const { data } = await moviesInstance.get(`tv/${id}/videos`, {
    params: {
      language,
    },
  });
  return data;
};
