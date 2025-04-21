const animalImage = document.querySelector('#animalImage');
const loader = document.querySelector('#loader');

function showLoader() {
  loader.classList.remove('hidden');
  animalImage.classList.add('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
  animalImage.classList.remove('hidden');
}

async function fetchCatImage() {
  try {
    showLoader();
    const res = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await res.json();
    animalImage.src = data[0].url;
  } catch (err) {
    console.error("고양이 이미지를 불러오는 데 실패했어요 🐱", err);
  } finally {
    hideLoader();
  }
}

async function fetchDogImage() {
  try {
    showLoader();
    const res = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await res.json();
    animalImage.src = data.message;
  } catch (err) {
    console.error("강아지 이미지를 불러오는 데 실패했어요 🐶", err);
  } finally {
    hideLoader();
  }
}