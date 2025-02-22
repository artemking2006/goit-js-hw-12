import { getImage } from './js/pixabay-api';
import { addLoadStroke } from './js/render-functions';
import errorIcon from './img/error.svg';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
import { markup } from '/js/render-functions';
import { removeLoadStroke } from '/js/render-functions';


const box = document.querySelector('.gallery');
const load = document.querySelector('.load');
const addMoreButton = document.querySelector('.add-more-button');
const form = document.querySelector('.form');
const input = document.querySelector('.user-input');
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

let page = 1;
let perPage = 15;

 function resetPage() {
  page = 1;
}
 function addPage() {
  page += 1;
}

const URL = `https://pixabay.com/api/?${urlParams}`;

try {
  const { data } = await axios.get(URL);
  markup(data);
  if (data.totalHits < page * perPage) {
    endOfList(load);
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
}

form.addEventListener('submit', event => {
  event.preventDefault();
  let inputValue = input.value.trim();
  if(!inputValue) {
    iziToast.show({
      ...iziOption,
      message: 'Please enter the search query',
    });
    return;
  }
  box.innerHTML = '';
  resetPage();
  addLoadStroke(load);
  getImage(inputValue);
});

function endOfList(daddyElement) {
  removeLoadStroke(daddyElement);
  daddyElement.insertAdjacentHTML(
    'beforeend',
    '<p class="loading-text">We\'re sorry, but you\'ve reached the end of search results .</p>'
  );
  addMoreButton.classList.add('hide');
}

addMoreButton.addEventListener('click', event => {
  let inputValue = input.value.trim();
  addPage();
  addLoadStroke(load);
  getImage(inputValue);
});




