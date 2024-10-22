import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com/';

export const fetchImagesByTitle = async (title, page) => {
  const axiosOptions = {
    params: {
      query: title,
      page: page,
      per_page: 30,
      client_id: '_R4aQuJ40OU1qnBtzE5IaPSM__8d7icgebkN2VAJd-4',
      orientation: 'portrait',
    },
  };

  return await axios.get('search/photos', axiosOptions);
};
