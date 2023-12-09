import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const elements = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  catInfo: document.querySelector('.cat-info'),
};

elements.breedSelect.addEventListener('input', showCatInfo);

fetchBreeds()
  .then(response => {
    elements.breedSelect.innerHTML = createSelectMarkup(response.data);
    elements.breedSelect.classList.remove('visually-hidden');
    elements.loader.classList.add('visually-hidden');
  })
  .catch(() => {
    elements.loader.classList.add('visually-hidden');
    iziToast.show({
      messageColor: '#fafafa',
      backgroundColor: '#f56c6c',
      messageSize: '18px',
      position: 'bottomLeft',
      progressBar: false,
      animateInside: false,
      transitionIn: 'fadeIn',
      transitionOut: 'fadeOut',
      timeout: 3000,
      targetFirst: false,
      message: 'Oops! Something went wrong! Try reloading the page!',
    });
  });

function showCatInfo(evt) {
  const select = evt.currentTarget;
  elements.loader.classList.remove('visually-hidden');
  elements.catInfo.innerHTML = '';
  fetchCatByBreed(select.value)
    .then(response => {
      elements.loader.classList.add('visually-hidden');
      console.log(response.data);
      elements.catInfo.innerHTML = createInfoMarkup(response.data);
    })
    .catch(() => {
      elements.loader.classList.add('visually-hidden');
      iziToast.show({
        messageColor: '#fafafa',
        backgroundColor: '#f56c6c',
        messageSize: '18px',
        position: 'bottomLeft',
        progressBar: false,
        animateInside: false,
        transitionIn: 'fadeIn',
        transitionOut: 'fadeOut',
        timeout: 3000,
        targetFirst: false,
        message: 'Oops! Something went wrong! Try choose another option!',
      });
    });
}

function createSelectMarkup(breeds) {
  return '<option value="0" disabled selected>Choose breed</option>'.concat(
    breeds
      .map(breed => {
        return `<option value="${breed.id}">${breed.name}</option>`;
      })
      .join('')
  );
}

function createInfoMarkup(data) {
  const breed = data[0].breeds[0];
  const breedImg = data[0];
  return `
      <img src="${breedImg.url}" alt="${breed.name}" width=500px height=${
    (breedImg.height * 500) / breedImg.width
  }/>
      <div class='cat-info-text-wrapper'>
      <h2>${breed.name}</h2>
      <p>${breed.description}</p>
      <p><b>Temperamrnt: </b>${breed.temperament}</p>
      </div>`;
}
