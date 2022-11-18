const latitude = -22.000;
const longitude = -49.000;
const baseURL = 'https://api.openweathermap.org';
const apiKey = '1d7bffed80c21a62856f00c87f60f8f5';

const fetchWeather = async () => {
  const url = `${baseURL}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  }

  return Promise.reject('error while trying to fetch the weather api');
}

const appendResult = ({ main, weather }) => {
  const currentTemp = document.querySelector('#current-temp');
  const weatherIcon = document.querySelector('#weather-icon');
  const captionDesc = document.querySelector('figcaption');

  currentTemp.innerHTML = `<strong>${main.temp.toFixed(0)}</strong>`;

  const iconsrc = `https://openweathermap.org/img/w/${weather[0].icon}.png`;
  const desc = weather[0].description;

  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc;
}

(async () => {
  try {
    const weather = await fetchWeather();
    appendResult(weather);
  } catch (e) {
    console.error(e);
  }
})();
