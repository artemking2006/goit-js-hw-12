import { markup } from '/js/render-functions';
import { endOfList } from '/js/render-functions';
import { removeLoadStroke } from '/js/render-functions';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorIcon from '../img/error.svg';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const box = document.querySelector('.gallery');
const load = document.querySelector('.load');


const iziOption = {
  messageColor: '#FAFAFB',
  messageSize: '16px',
  backgroundColor: '#EF4040',
  iconUrl: errorIcon,
  transitionIn: 'bounceInLeft',
  position: 'topRight',
  displayMode: 'replace',
  closeOnClick: true,
};


let perPage = 40;



export async function getImage(searchedQuery, pageNumber) {
  const API_KEY = '48883219-a8d6c51151168ef356226c6a1';
  const query = encodeURIComponent(searchedQuery);
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: searchedQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: pageNumber,
    per_page: perPage,
  });

  const URL = `https://pixabay.com/api/?${urlParams}`;

  try {
    const { data } = await axios.get(URL);
    
    if (data.hits.length === 0) {
      iziToast.show({
        ...iziOption,
        message: 'Sorry, no images found. Try another query!',
      });
      box.innerHTML = '';
      removeLoadStroke(load);
      return 0;
    }

    markup(data);

    if (pageNumber * perPage >= data.totalHits) {
      endOfList(load);
    }

    return data.totalHits;
  } catch (error) {
    console.error(error);
    box.innerHTML = '';
    removeLoadStroke(load);
    iziToast.show({
      ...iziOption,
      message: 'Sorry, an error happened. Try again',
    });
    return 0;
  }
} 
  

