import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_ZFQVP9BYXDyskIBsbQCvWyd3nxarCIc8p7wrGzBJCYWWt7kcFWPgUmGZdnFN782B';

function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds');
}

function fetchCatByBreed(breedId) {
  return axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
}

export { fetchBreeds, fetchCatByBreed };
