import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const KEY = '32824760-2796a443e813a0729e14c560b';

export async function getAxios(req, pageNum) {
  try {
    const response = await axios.get(`${URL}/?key=${KEY}&q=${req}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNum}`);
    // if (!response.ok) {
    //   throw new Error(response.statusText)
    // }
    return response.data
  } catch (error) {
    console.error(error);
  }

}

