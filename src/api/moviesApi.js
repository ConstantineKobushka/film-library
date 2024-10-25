import axios from 'axios';

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDhmM2FjMTExOTI2NDQ1ZDNlMzMwOTliYmY5NDI2NCIsIm5iZiI6MTcyOTc2NTkxMi44MTgyMTcsInN1YiI6IjY3MWExZjczMzRjMGZhYmQ2ODFjNThhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0IRZjbicA29MlXQ5wNqfn4AHx0cu21T6dWq5w4dFHTc';

const movieInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer ${token}`,
  },
  params: {
    include_adult: false,
    language: 'en-US',
  },
});

export const getTrendingMovies = async () => {
  const { data } = await movieInstance.get('trending/movie/day');
  return data;
};
// ! Старый код
// axios.defaults.baseURL = 'https://api.unsplash.com/';

// export const fetchImagesByTitle = async (title, page) => {
//   const axiosOptions = {
//     params: {
//       query: title,
//       page: page,
//       per_page: 30,
//       client_id: '_R4aQuJ40OU1qnBtzE5IaPSM__8d7icgebkN2VAJd-4',
//       orientation: 'portrait',
//     },
//   };

//   return await axios.get('search/photos', axiosOptions);
// };
// !

// ! Конспект
// const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';

// const options = {
//   headers: {
//     // Замість api_read_access_token вставте свій токен
//     Authorization: 'Bearer api_read_access_token',
//   },
// };

// axios
//   .get(url, options)
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));
// !

// ! Лекция
// import axios from 'axios';

// const productsInstance = axios.create({
//   baseURL: 'https://dummyjson.com/products',
//   // headers: {
//   //     Authorization: `Bearer ${token}`
//   // }
//   // params: {
//   //     include_adult: false,
//   //     language: "en-US",
//   // }
// });

// export const getProducts = async (params) => {
//   const { data } = await productsInstance.get('/', {
//     params,
//   });
//   return data;
// };

// export const searchProducts = async (q) => {
//   const { data } = await productsInstance.get('/search', {
//     params: {
//       q,
//     },
//   });
//   return data;
// };

// export const getProductById = async (id) => {
//   const { data } = await productsInstance.get(`/${id}`);
//   return data;
// };
// !
