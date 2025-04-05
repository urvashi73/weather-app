const inputBox = document.getElementById('inputBox');
const searchBtn = document.getElementById('searchBtn');
const weatherImage = document.querySelector('.weather-image');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

async function checkWeather(city) {
  const apiKey = '3c93a69ada1df23ff1c7bb9df8739f30';
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiURL);
    const weatherData = await response.json();

    if (weatherData.cod !== 200) {
      document.getElementById('weatherResult').innerHTML = `<p>City not found!</p>`;
      return;
    }

    temperature.innerHTML = `${Math.round(weatherData.main.temp)}°C`;
    description.innerHTML = weatherData.weather[0].description;
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    windSpeed.innerHTML = `${weatherData.wind.speed} km/h`;

    switch (weatherData.weather[0].main) {
      case 'Clouds':
        weatherImage.src = './images/cloud.png';
        break;
      case 'Clear':
        weatherImage.src = './images/clear.png';
        break;
      case 'Rain':
        weatherImage.src = './images/rain.png';
        break;
      case 'Mist':
        weatherImage.src = './images/mist.png';
        break;
      case 'Snow':
        weatherImage.src = './images/snow.png';
        break;
      default:
        weatherImage.src = '';
        break;
      
    }
  } catch (error) {
    console.error('Error fetching weather:', error);
    document.getElementById('weatherResult').innerHTML = `<p>Something went wrong. Please try again later.</p>`;
  }
}

searchBtn.addEventListener('click', () => {
  const city = inputBox.value.trim();
  if (city) {
    checkWeather(city);
  }
});
