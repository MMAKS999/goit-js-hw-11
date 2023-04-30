import Notiflix from 'notiflix';
// Функція генерування запиту за назвою країни

export const fetchCountries = (name, functionE,clearList ) => {
  fetch(
    // `https://restcountries.com/v3.1/name/${name}`
    `https://restcountries.com/v3.1/name/${name}?fields=capital,population,flags,languages,name`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      functionE(data);
    })
    .catch(error => {
      CountriesNot();
      clearList();
    });
};

const CountriesNot = () => {
  Notiflix.Notify.failure('Oops, there is no country with that name');
};



