import { getImage } from './js/pixabay-api';
import { addLoadStroke } from './js/render-functions';
import { removeLoadStroke } from '/js/render-functions';
import { endOfList } from '/js/render-functions';
import errorIcon from './img/error.svg';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';
import { markup } from '/js/render-functions';




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
let perPage = 40;
let totalHits = 0;

 function resetPage() {
  page = 1;
}
 function addPage() {
  page += 1;
}


form.addEventListener('submit', async event => {
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
 
  totalHits = await getImage(inputValue, page, perPage);
  if (totalHits <= perPage) {
    endOfList(load);
  }
});


addMoreButton.addEventListener('click', async () => {
  let inputValue = input.value.trim();
  addPage();
  addLoadStroke(load);

  const loadedImages = await getImage(inputValue, page, perPage);

  if (page * perPage >= totalHits) {
    endOfList(load);
  } else {
    smoothScroll();
  }
});

function smoothScroll() {
  const firstNewImage = document.querySelector('.gallery__item:last-child');
  if (firstNewImage) {
    const rect = firstNewImage.getBoundingClientRect();
    window.scrollBy({
      top: rect.height * 2,
      behavior: 'smooth',
    });
  }
}




