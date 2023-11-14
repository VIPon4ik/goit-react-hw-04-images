import axios from 'axios';

const API_KEY = '19760378-d2f1c7488e9d6752a9d7092b3';

export const getImagesData = async (query) => {
  const response = await axios.get(`?key=${API_KEY}&q=${query}&per_page=12`);
  return [response.data.hits, response.data.totalHits];
};

export const loadMoreImages = async(query, page) => {
  const response = await axios.get(`?key=${API_KEY}&q=${query}&page=${page}&per_page=12`);
  return response.data.hits;
}

const api = {
  getImagesData,
  loadMoreImages
}

export default api;
