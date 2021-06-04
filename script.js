//-----------------------------------------------  Return Current Day and Time  ------------------------------------------//
function showTime(timestamp) {
  console.log(timestamp);
  let date = new Date(timestamp);
  console.log(date);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[dayIndex];
  return `${day} ${hour}:${minutes}`;
}

function showDate(timestamp) {
  console.log(timestamp);
  let date = new Date(timestamp);
  console.log(date);

  let numberDate = date.getDate();
  let monthIndex = date.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[monthIndex];
  let year = date.getFullYear();
  return `${numberDate} ${month} ${year}`;
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
  document.querySelector("#description").innerHTML =
    position.data.weather[0].description;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${position.data.weather[0].icon}@2x.png`
    );

  let date = document.querySelector("#date");
  date.innerHTML = showDate(position.data.dt * 1000);

  let time = document.querySelector("#time");
  time.innerHTML = showTime(position.data.dt * 1000);
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

let searchBtn = document.querySelector("#form");
searchBtn.addEventListener("submit", getSearchCity);

let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", getCurrentPosition);

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", switchToFarenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", switchToCelsius);

handleSearchCity("Stockholm");
