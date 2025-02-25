import { markup } from '/js/render-functions';
import { removeLoadStroke } from '/js/render-functions';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorIcon from '../img/error.svg';


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


let perPage = 15;
let page = 1;


export async function getImage(page) {
  const API_KEY = '48883219-a8d6c51151168ef356226c6a1';
  const input = document.querySelector('.user-input');
  const query = encodeURIComponent(input);
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: 40,
  });

  const URL = `https://pixabay.com/api/?${urlParams}`;

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
  

