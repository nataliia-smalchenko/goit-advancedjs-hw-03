import SlimSelect from 'slim-select';
import 'slim-select/styles';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const elements = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

// elements.breedSelect.addEventListener('input', showCatInfo);

let breedSelect;

fetchBreeds()
  .then(response => {
    breedSelect = new SlimSelect({
      select: '#breed-select',
      settings: {
        placeholderText: 'Choose breed',
        showSearch: false,
      },
      data: createSelectMarkup(response.data),
      events: {
        afterClose: newVal => {
          console.log(newVal);
        },
      },
    });
    elements.breedSelect.classList.remove('visually-hidden');
    elements.loader.classList.add('visually-hidden');
  })
  .catch(error => {
    elements.error.classList.remove('visually-hidden');
    elements.loader.classList.add('visually-hidden');
    console.log(error);
  });

function showCatInfo(value) {
  elements.error.classList.add('visually-hidden');
  elements.loader.classList.remove('visually-hidden');
  fetchCatByBreed(value)
    .then(response => {
      elements.loader.classList.add('visually-hidden');
      console.log(response.data);
      elements.catInfo.innerHTML = createInfoMarkup(response.data);
    })
    .catch(error => {
      elements.error.classList.remove('visually-hidden');
      elements.loader.classList.add('visually-hidden');
      elements.catInfo.innerHTML = '';
      console.log(error);
    });
}

function createSelectMarkup(breeds) {
  const breedsOptions = [{ value: 0, text: 'Choose breed', placeholder: true }];
  breeds.forEach(({ id, name }) => {
    breedsOptions.push({ value: id, text: name });
  });
  return breedsOptions;
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
