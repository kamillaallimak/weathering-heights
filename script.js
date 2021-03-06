//-----------------------------------------------  Return Current Day and Time (and formate date/time)  ------------------------------------------//
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

function formatDay(timestamp) {
  console.log(timestamp);
  let date = new Date(timestamp * 1000);
  console.log(date);
  let dayIndex = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[dayIndex];
}

//-----------------------------------------------  Unit conversion for Current Temperature ------------------------------------------//

function selectUnit() {
  let units = "metric";
  return units;
}

function changeUnit(e) {
  e.preventDefault();
  if (e.target.id === "farenheit") {
    let fTemp = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#currentTemp");
    temperatureElement.innerHTML = Math.round(fTemp);
    //DOM JS: classlist - "Remove the active-class the celsius degrees is using as a default, and add it to the Farenheit unit instead"
    celsiusLink.classList.remove("active");
    celsiusLink.classList.add("inactive");
    farenheitLink.classList.remove("inactive");
    farenheitLink.classList.add("active");
  } else if (e.target.id === "celsius") {
    let temperatureElement = document.querySelector("#currentTemp");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    celsiusLink.classList.remove("inactive");
    celsiusLink.classList.add("active");
    farenheitLink.classList.add("inactive");
    farenheitLink.classList.remove("active");
  }
}

//-----------------------------------------------  Weather for Search Result ------------------------------------------//
//Get the weather data (for the city or the current lat/long coordinates provided by the API in the previous step)
function showForecastData(coordinates) {
  let units = selectUnit();
  let apiKey = "95aa18dfa2d4f8bc875941518d00ae49";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(positionResponse) {
  document.querySelector("#location").innerHTML = positionResponse.data.name;

  celsiusTemperature = positionResponse.data.main.temp; //send the temperature to the global variable "celsiusTemperature" so that it can be used in other functions as well

  document.querySelector("#currentTemp").innerHTML =
    Math.round(celsiusTemperature);

  document.querySelector("#humidity").innerHTML = Math.round(
    positionResponse.data.main.humidity
  );
  document.querySelector("#windspeed").innerHTML = Math.round(
    positionResponse.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    positionResponse.data.weather[0].description;

  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${positionResponse.data.weather[0].icon}@2x.png`
    );

  let date = document.querySelector("#date");
  date.innerHTML = showDate(positionResponse.data.dt * 1000);

  let time = document.querySelector("#time");
  time.innerHTML = showTime(positionResponse.data.dt * 1000);
  showForecastData(positionResponse.data.coord);
}

//-----------------------------------------------  Weather - Serach City Input ------------------------------------------//
//Search for the city weather conditions using the weather API
function handleSearchCity(city) {
  let units = selectUnit();
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
  let units = selectUnit();
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

//-------------------------------------------- Display Weather forecast for the 4 coming days ---------------------------------------------------------//
function displayForecast(forecastResponse) {
  let forecastData = forecastResponse.data.daily;
  console.log(forecastData);
  console.log(forecastData[0].weather[0].icon);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";

  let forecastFirst = `
  <div class="day-first box-a">
             <ul class="ul">
               <img src="http://openweathermap.org/img/wn/${
                 forecastData[0].weather[0].icon
               }@2x.png" alt="next day weather icon" class="icons"> 
               <li>${formatDay(forecastData[1].dt)}</li>
               <li > <span class="max-temp">${Math.round(
                 forecastData[1].temp.max
               )}</span>?? <span class="min-temp" ><span>${Math.round(
    forecastData[1].temp.min
  )}</span>??</span></li>
             </ul>
 </div>`;

  let forecastMiddle = "";
  forecastData.forEach(function (day, index) {
    if (index > 1 && index < 4) {
      forecastMiddle =
        forecastMiddle +
        `
        <div class="day-middle box-b">
                  <ul class="ul">
                    <img src="http://openweathermap.org/img/wn/${
                      day.weather[0].icon
                    }@2x.png" alt="next day weather icon" class="icons"> 
                    <li>${formatDay(day.dt)}</li>
                    <li> <span class="max-temp">${Math.round(
                      day.temp.max
                    )}</span>?? <span class="min-temp" ><span>${Math.round(
          day.temp.min
        )}</span>??</span></li>
                  </ul>
      </div>`;
    }
  });

  let forecastLast = `
   <div class="day-last box-b">
             <ul class="ul">
               <img src="http://openweathermap.org/img/wn/${
                 forecastData[4].weather[0].icon
               }@2x.png" alt="next day weather icon" class="icons"> 
               <li>${formatDay(forecastData[4].dt)}</li>
               <li > <span class="max-temp">${Math.round(
                 forecastData[4].temp.max
               )}</span>?? <span class="min-temp" ><span>${Math.round(
    forecastData[4].temp.min
  )}</span>??</span></li>
             </ul>             
  </div>
           `;
  forecastHTML = forecastFirst + forecastMiddle + forecastLast;
  forecastElement.innerHTML = forecastHTML;
}

let searchBtn = document.querySelector("#form");
searchBtn.addEventListener("submit", getSearchCity);

let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", getCurrentPosition);

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", (e) => changeUnit(e));

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", (e) => changeUnit(e));

handleSearchCity("Stockholm");
let celsiusTemperature = null;
