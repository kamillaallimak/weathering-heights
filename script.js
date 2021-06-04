//-----------------------------------------------  Return Current Day and Time  ------------------------------------------//
function showTime(timestamp) {
  let date = new Date(timestamp);
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
  let date = new Date(timestamp);
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
/*function standardUnits() {
  alert("Standard Celsius");
  let units = "metric";
  return units;
}*/

function selectUnit(e) {
  if (e.target.id === "farenheit") {
    alert("Farenheit");
  } else if (e.target.id === "celsius") {
    alert("Celsius");
  }
  /* if (e.target.id === "farenheit") {
    alert("Farenheit");
    let units = "imperial";
    return units;
  } else if (e.target.id === "celsius") {
    alert("Celsius");
    units = "metric";
    return units;
  } else {
    let units = standardUnits();
  } */
}

//-----------------------------------------------  Weather for Search Result ------------------------------------------//
//Get the weather data (for the city or the current lat/long coordinates provided by the API in the previous step)
function showWeather(position) {
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

//-----------------------------------------------  Weather - Serach City Input ------------------------------------------//
//Search for the city weather conditions using the weather API
function handleSearchCity(city) {
  let units = "metric";
  let apiKey = "95aa18dfa2d4f8bc875941518d00ae49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

//Get the "City" from the input search field in the form
function getSearchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  handleSearchCity(city);
}

//-----------------------------------------------  Weather -  Current Position Input ------------------------------------------//
function handleCurrentPosition(position) {
  let units = "metric";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "95aa18dfa2d4f8bc875941518d00ae49";
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
farenheitLink.addEventListener("click", (e) => selectUnit(e));

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", (e) => selectUnit(e));

handleSearchCity("Stockholm");
