const toggleClicked = () => {
  const element = document.getElementById('menu-list-taggable');
  const style = element.getAttribute('style');

  if (!style) {
    element.setAttribute('style', 'display: block');
  }

  const regex  = /display: block/g;
  if (regex.test(style)) {
    element.setAttribute('style', '');
  }
}

const checkCurrentMenuItem = () => {
  const path = window.location.pathname;
  let currentLinkId = '';

  if (path.includes('index')) {
    currentLinkId = 'home-link-wrapper';
  }

  if (path.includes('fresh')) {
    currentLinkId = 'fresh-link-wrapper';
  }

  if (path.includes('about')) {
    currentLinkId = 'about-link-wrapper';
  }

  const element = document.getElementById(currentLinkId);
  if (element) {
    element.setAttribute('class', 'current');
  }
}

const initObserver = () => {
  const images = document.querySelectorAll('[data-src]');
  const options = {
    threshold: 1,
  };

  const preloadImg = (img) => {
    const src = img.getAttribute('data-src');

    if (!src) {
      return;
    }

    img.src = src;
  }

  const observer = (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      preloadImg(entry.target);
      obs.unobserve(entry.target);
    })
  }

  const imgObserver = new IntersectionObserver(observer, options);

  images.forEach((image) => {
    imgObserver.observe(image);
  });
};

const latitude = -22.000;
const longitude = -49.000;
const baseURL = 'https://api.openweathermap.org';
const apiKey = '1d7bffed80c21a62856f00c87f60f8f5';

const baseFruitAPI = 'https://brotherblazzard.github.io/canvas-content/fruit.json';

const fetchWeather = async () => {
  const url = `${baseURL}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  }

  return Promise.reject('error while trying to fetch the weather api');
}

const appendResult = ({ main, weather, wind }) => {
  const currentTemp = document.querySelector('#current-temp');
  const currentCond = document.querySelector('#current-condition');
  const windCond = document.querySelector('#wind-condition');
  const weatherIcon = document.querySelector('#weather-icon');
  const captionDesc = document.querySelector('figcaption');

  currentTemp.innerHTML = `${main.temp.toFixed(0)} F`;
  windCond.innerHTML = `Wind speed: ${wind.speed}`;

  const iconsrc = `https://openweathermap.org/img/w/${weather[0].icon}.png`;
  const desc = weather[0].description;

  currentCond.innerHTML = `Condition: ${desc}`;

  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
}

const fetchFruits = async () => {
  const response = await fetch(baseFruitAPI);

  if (response.ok) {
    return response.json();
  }

  return Promise.reject('error while trying to fetch the fruits api');
}

const appendFruits = (fruits) => {
  const select = document.getElementById('fruits');

  fruits.forEach((fruit) => {
    const option = document.createElement('option');
    option.setAttribute('value', fruit.name);
    option.innerText = fruit.name;

    select.append(option);
  });
}

(async () => {
  const menu = document.getElementById('menu');
  if (menu) {
    menu.addEventListener('click', toggleClicked);
  }

  checkCurrentMenuItem();
  initObserver();

  try {
    if (!window.location.href.includes('fresh')) {
      const weather = await fetchWeather();
      appendResult(weather);
    }

    const fruits = await fetchFruits();
    appendFruits(fruits);
  } catch (e) {
    console.error('error while trying to fetch api', e);
  }
})();
