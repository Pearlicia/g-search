
// mine c8179447bd2953cd63b9fa3cea6b286d
// new 0bc067623234ba9de65b42121a3c4542



// SELECT ELEMENTS

const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const humidity = document.getElementById('humidity');
const precipitation = document.getElementById('precipitation');
const wind = document.getElementById('wind');



// App Data
const weather = {};

weather.temperature = {
    unit : "celcius"
}

const KELVIN = 273;
const key = "0bc067623234ba9de65b42121a3c4542";

// Check if browser supports Geolocation
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// Set user's position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// Show error when there is an issue with geolocation service
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;

}

// Get weather from Api provider
function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            console.log(data);
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.humidity = data.main.humidity;
            weather.wind = data.wind.speed;
        })
        .then(function() {
            displayWeather();
        });
}

// Display weather to UI
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}<span>&#8451;</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    humidity.innerHTML = `${weather.humidity}%`;
    wind.innerHTML = `${weather.wind}km/h`;
}

// C to F conversion
function celciusToFahrenheit(temperature) {
    return (temperature * 9/5) + 32;
}

// When the user clicks on the temperature element
tempElement.addEventListener('click', function() {
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "celcius") {
        let fahrenheit = celciusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}<span>&#8457;</span>`;
        weather.temperature.unit = "fahrenheit";
    }else {
        tempElement.innerHTML = `${weather.temperature.value}<span>&#8451;</span>`;
        weather.temperature.unit = "celcius";

    } 
})

// Adding Search Functionality

// Unit Type
const unitType = 'imperial'
let searchMethod = 'q'

function searchWeather(searchTerm) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${key}`)
    .then(res => {
        return res.json();
    }).then( res => {
        // console.log(res)
        if (res.cod == '404') {
            alert(res.message)
        } else {
            weather.temperature.value = Math.floor(res.main.temp - KELVIN);
            weather.description = res.weather[0].description;
            weather.iconId = res.weather[0].icon;
            weather.city = res.name;
            weather.country = res.sys.country;
            weather.humidity = res.main.humidity;

            humidity.innerHTML = `<p>${weather.humidity}</p>`
        }

    }).then(function() {
        displayWeather();
    }).catch(e => alert(e));
}

// Getting Values From Form Field
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    let searchTerm = document.getElementById('searchInput').value;

    if (searchTerm) {
        searchWeather(searchTerm);
    }
})

// Init Function

function init(resultFromServer) {
    console.log(resultFromServer)
    
}


// Responsive Hamburger menu function

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

