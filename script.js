//-----------------------------------------------  Return Current Day and Time  ------------------------------------------//
function showTime(now) {
  console.log(now);
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} kl.${hour}:${minutes}`;
}

//-----------------------------------------------  Unit conversion for Current Temperature ------------------------------------------//
function convertToFarenheit() {
  let temp = document.querySelector("#currentTemp");
  let tempF = Math.round(temp.innerHTML * 1.8 + 32);
  temp.innerHTML = `${tempF}`;
}

function convertToCelsius() {
  let temp = document.querySelector("#currentTemp");
  let tempC = Math.round((5 / 9) * (temp.innerHTML - 32));
  temp.innerHTML = `${tempC}`;
}

function switchToFarenheit() {
  convertToFarenheit();
  let tempUnit = celsiusLink;
  tempUnit.innerHTML = `°F`;
  let otherTempUnit = farenheitLink;
  otherTempUnit.innerHTML = `°C`;
}

function switchToCelsius() {
  convertToCelsius();
  let tempUnit = farenheitLink;
  tempUnit.innerHTML = `°F`;
  let otherTempUnit = celsiusLink;
  otherTempUnit.innerHTML = `°C`;
}

//-----------------------------------------------  Weather for Search Result ------------------------------------------//
//Get the weather data (for the city or the current lat/long coordinates provided by the API in the previous step)
function showWeather(position) {
  console.log(position);
  console.log(position.data.weather[0].icon);
  document.querySelector("#location").innerHTML = position.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    position.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    position.data.main.humidity
  );
  document.querySelector("#windspeed").innerHTML = Math.round(
    position.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${position.data.weather[0].icon}@2x.png`
    );
}

//Search for the city weather conditions using the weather API
function handleSearchCity(city) {
  let apiKey = "95aa18dfa2d4f8bc875941518d00ae49";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}

//Get the "City" from the input search field in the form
function getSearchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  handleSearchCity(city);
}

//-----------------------------------------------  Weather for Current Position ------------------------------------------//
function handleCurrentPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  console.log(lat);
  let long = position.coords.longitude;
  console.log(long);
  let apiKey = "95aa18dfa2d4f8bc875941518d00ae49";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handleCurrentPosition);
}

//------------------------------------------------------------------------------------------------------------------------//

let now = new Date();
let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = showTime(now);

let searchBtn = document.querySelector("#form");
searchBtn.addEventListener("submit", getSearchCity);

let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", getCurrentPosition);

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", switchToFarenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", switchToCelsius);

handleSearchCity("Stockholm");
