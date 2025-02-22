
import axios from 'axios';


export async function getImage(input) {
  const API_KEY = '48883219-a8d6c51151168ef356226c6a1';
  const query = encodeURIComponent(input);
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: perPage,
  });
}


 /* const URL = `https://pixabay.com/api/?${urlParams}`;

  try {
    const { data } = await axios.get(URL);
    markup(data);
    if (data.totalHits < page * perPage) {
      endOfList(load);
      return;
    }
    if (page >= 2) {
      const list = document.querySelector('.gallery__item');
      const rect = list.getBoundingClientRect();
      window.scrollBy({
        top: rect.height * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    console.error(error);
    box.innerHTML = '';
    load.innerHTML = '';
    iziToast.show({
      ...iziOption,
      message: 'Sorry, an error happened. Try again',
    });
    return;
  }
} 
  */

