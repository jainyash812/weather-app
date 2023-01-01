const api = {
  key: "f4ccf89d0886efb09c9ec866c84de274",
  base: "https://api.openweathermap.org/data/2.5/"
}
// date calculation //
var date = new Date(); 
var dd = date.getDate(); 
var mm = date.getMonth() + 1; 
var yyyy = date.getFullYear(); 
var newDate = dd + "-" + mm + "-" +yyyy; 
// date calculation //

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
const dateElement = document.querySelector('.date');
dateElement.innerHTML = new Date();

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp/10)}<span>°c</span>`;

  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min/10)}°c / ${Math.round(weather.main.temp_max/10)}°c`;
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
