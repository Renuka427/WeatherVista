const apiKey = '7664cfdff13b4940b8682650242712'; 
const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('city');
const themeToggleButton = document.getElementById('theme-toggle');


themeToggleButton.addEventListener('click', function () {
  document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme');
});


searchButton.addEventListener('click', function () {
  const cityName = cityInput.value.trim();
  if (cityName) {
    fetchWeather(cityName);
  } else {
    alert("Please enter a city name.");
  }
});


function fetchWeather(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert("City not found. Please try again.");
      } else {
        displayWeather(data);
      }
    })
    .catch(error => {
      alert("An error occurred. Please try again.");
      console.error("Error:", error);
    });
}


function displayWeather(data) {
  const location = `${data.location.name}, ${data.location.region}`;
  const temperature = data.current.temp_c; // Temperature in Celsius
  const weatherDescription = data.current.condition.text;
  const iconCode = data.current.condition.icon;
  const weatherIconUrl = `https:${iconCode}`;
  const humidity = data.current.humidity;
  const windSpeed = data.current.wind_kph;


  document.getElementById('location').textContent = location;
  document.getElementById('temperature').textContent = `${temperature}°C`;
  document.getElementById('weather-description').textContent = weatherDescription;
  document.getElementById('weather-icon').style.backgroundImage = `url(${weatherIconUrl})`;
  document.getElementById('humidity').textContent = humidity;
  document.getElementById('wind-speed').textContent = windSpeed;

  
  updateBackground(weatherDescription);
}


function updateBackground(description) {
  
  document.body.classList.remove('rain', 'snow', 'mist', 'sunny', 'cloudy');

  
  if (description.includes('rain')) {
    document.body.classList.add('rain');
  } else if (description.includes('snow')) {
    document.body.classList.add('snow');
  } else if (description.includes('mist')) {
    document.body.classList.add('mist');
  } else if (description.includes('cloudy')) {
    document.body.classList.add('cloudy');
  } else {
    document.body.classList.add('sunny');
  }
}
