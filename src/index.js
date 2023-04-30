// import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';

const refs = {
  getButton: document.querySelector('.load-more'),
  form: document.querySelector('.search-form'),
  text: document.querySelector("[name='searchQuery']"),
  gallery: document.querySelector('.gallery'),
};
// зміна відображення сторінки
let page;
// Додавання стилів
const styles = document.createElement('style');
const styleText = `  
.gallery{
display: flex;
flex-wrap: wrap;
}
.photo-card{
   
}

.button-none{
  display: none;
}
.info{
  display: flex;
  flex-wrap: nowrap;
}
.info-item {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  margin-left: 10px;
}
`;

styles.textContent = styleText;
document.head.appendChild(styles);
// Функція приховування-відопбраження кнопки
const buttonNone = () => {
  refs.getButton.classList.toggle('button-none');
};

// Функція очищення вмісту елементів
const clearList = () => {
  refs.gallery.innerHTML = '';
};

// Функція довантаження наступних зображень
const createPost = () => {
  const text = refs.text.value;
  getPhoto(text, page);
};

// Функція генерування запиту по назві картинки
// const getPhoto = (text, page) => {
//   fetch(
//     `https://pixabay.com/api/?key=35881269-5244fadfdfc6e51dbaa5f3ad4&q=${text}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
//   )
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       console.log(data.hits[0]);
//       consolElementData(data);
//       insertContent(data.hits);
//       hooray(data.totalHits, page);
//       endImg(page, data.totalHits);
//     })
//     .catch(error => console.log(error));
// };

const getPhoto = async (text, page) => {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=35881269-5244fadfdfc6e51dbaa5f3ad4&q=${text}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
    const data = await response.json();
    console.log(data);
    console.log(data.hits[0]);
    consolElementData(data);
    insertContent(data.hits);
    hooray(data.totalHits, page);
    endImg(page, data.totalHits);
  } catch (error) {
    console.log(error);
  }
};

// function create first search
const firstSearch = e => {
  e.preventDefault();
  console.log('hi');
  page = 1;
  clearList();
  createPost();
  buttonNone();
};

// Function event search
refs.form.addEventListener('submit', firstSearch);

// Функція виконання запиту на завантаження наступних зображеннь
const addingImage = () => {
  page += 1;
  createPost();
};

refs.getButton.addEventListener('click', addingImage);

// Функція виведення значень в консоль
const consolElementData = data => {
  console.log(data.hits[0]);
  console.log(data.hits[0].webformatURL);
  console.log(data.hits[0].largeImageURL);
  console.log(data.hits[0].tags);
  console.log(data.hits[0].likes);
  console.log(data.hits[0].views);
  console.log(data.hits[0].comments);
  console.log(data.hits[0].downloads);
};

// функція генерування одного елементу списку картинок
const createListItem = item => `<div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" style="width: 300px; height: 200px;   object-fit: cover; margin-right: 10px;" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${item.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${item.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${item.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${item.downloads}
    </p>
  </div>
</div>`;
// Функція розмноження рядка розмітки для всих елементів масиву країн
const generateContent = array =>
  array.reduce((acc, item) => acc + createListItem(item), '');

// функція додавання розмітки інформації про країну
const insertContent = array => {
  const result = generateContent(array);
  refs.gallery.insertAdjacentHTML('beforeend', result);
};

// Функція виведення інформаційного повідомлення
const hooray = (totalHits, page) => {
  if (page === 1) {
    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
  }
};
// Функція виведення повідомлення що нічого не знайдено
const hoorayFail = () => {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
};
// Функція виведення інформаційного повідомлення що картинки закінчились
const endImg = (page, totalHits) => {
  if (page * 40 >= totalHits) {
    refs.getButton.classList.add('button-none');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
};
