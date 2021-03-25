//========= Automatic slideshow ==========

var slideIndex = 0;
showSlides();

function showSlides() {
  var slides = document.getElementsByClassName("mySlides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 4000); // Change image every 2 seconds
}

// ========= AJAX GET CALL FOR WEATHER API ==================

let weather = new XMLHttpRequest();

weather.onload = function () {
  if (this.readyState == 4 && this.status == 200) {
    let jsonData = JSON.parse(this.responseText);
      currentTempF(jsonData.current.temp_f)
      tempFeelsLike(jsonData.current.feelslike_f)
      currentCondTxt(jsonData.current.condition.text)
      currentWindCond(jsonData.current.wind_mph)
      sunUv(jsonData.current.uv)
      humidity(jsonData.current.humidity)
  }
}

weather.open('GET', 'https://api.weatherapi.com/v1/current.json?key=90a5993dbf8e4a759f205342211503&q=Dewey Beach&aqi=no', true)
weather.send()

// Below will display current Temp and widgets based on time of the day vs. night.
function currentTempF(data) {
  let current = new Date();
  let day_night = current.getHours();
  if (day_night < 7 || day_night >= 19) {
    if (data != 'Sunny') {
      document.getElementById('current-temp-f').innerHTML =  Math.round(data) + ' &#8457 <i class="fas fa-cloud-moon"></i>';
      document.getElementById('current-weather-header').innerHTML = 'Dewey Beach, DE -- ' + Math.round(data) + ' &#8457 <i class="fas fa-cloud-moon"></i>';
      } else if (data == 'Light rain' || data == 'Heavy rain' || data == 'Rain') {
        document.getElementById('current-temp-f').innerHTML =  Math.round(data) + ' &#8457 <i class="fas fa-cloud-moon-rain"></i>';
        document.getElementById('current-weather-header').innerHTML = 'Dewey Beach, DE -- ' + Math.round(data) + ' &#8457 <i class="fas fa-cloud-moon-rain"></i>';
      } else if (data == 'Sunny') {
        document.getElementById('current-temp-f').innerHTML =  Math.round(data) + ' &#8457 <i class="fas fa-moon"></i>';
        document.getElementById('current-weather-header').innerHTML = 'Dewey Beach, DE -- ' + Math.round(data) + ' &#8457 <i class="fas fa-moon"></i>';
      }
  } else {
    if (data != 'Sunny') {
      document.getElementById('current-temp-f').innerHTML =  Math.round(data) + ' &#8457 <i class="fa fa-cloud" aria-hidden="true"></i>';
      document.getElementById('current-weather-header').innerHTML = 'Dewey Beach, DE -- ' + Math.round(data) + ' &#8457 <i class="fa fa-cloud" aria-hidden="true"></i>';
      } else if (data != 'Sunny' && data == 'rain') {
        document.getElementById('current-temp-f').innerHTML =  Math.round(data) + ' &#8457 <i class="fas fa-cloud-showers-heavy"></i>';
        document.getElementById('current-weather-header').innerHTML = 'Dewey Beach, DE -- ' + Math.round(data) + ' &#8457 <i class="fas fa-cloud-showers-heavy"></i>';
      } else if (data == 'Sunny') {
        document.getElementById('current-temp-f').innerHTML =  Math.round(data) + ' &#8457 <i class="fas fa-sun"></i>';
        document.getElementById('current-weather-header').innerHTML = 'Dewey Beach, DE -- ' + Math.round(data) + ' &#8457 <i class="fas fa-sun"></i>';
      }
  }
}


function tempFeelsLike(data) {
  document.getElementById('feels-like-f').innerHTML = '<span class="data-info">Feels like: </span>' + Math.round(data) + '&#8457';
}

function currentCondTxt(data) {
  document.getElementById('current-condition-text').innerHTML = '<span class="data-info">Conditions: </span>' + data;
}

function currentWindCond(data) {
  document.getElementById('current-wind-mph').innerHTML = '<span class="data-info">Wind: </span>' + Math.round(data) + ' mph';
}

function visMiles(data) {
  document.getElementById('visibility-miles').innerHTML = '<span class="data-info">Visibility: </span>' + data + ' miles';
}

function sunUv(data) {
  document.getElementById('uv').innerHTML = '<span class="data-info">UV: </span>' + data;
}

function humidity(data) {
  document.getElementById('humidity').innerHTML = '<span class="data-info">Humidity: </span>' + data + '%';
}



// ========= AJAX POST CALL FOR WAVE FORECAST API TOKEN  ==============

const toSend = {
  user: {
  email: 'kkruelle2@gmail.com',
  password: 'randomPasswrd'
}}

const jsonString = JSON.stringify(toSend);
console.log(jsonString)

let xhr = new XMLHttpRequest();

xhr.onload = function () {
  // let serverResponse = document.getElementById('what');
  // console.log(serverResponse.innerHTML = this.responseText);
};

xhr.open('POST', 'https://surfvideos.xyz/users/sign_in.json')
xhr.setRequestHeader('Accept', 'application/json');
xhr.setRequestHeader('Content-type', 'application/json');
xhr.setRequestHeader('Content-type', 'application/json');
xhr.send(jsonString);

//API Token returned: {"id":344,"email":"kkruelle2@gmail.com","created_at":"2021-03-18T18:38:44.061Z","updated_at":"2021-03-18T18:38:44.065Z","provider":null,"uid":null,"authentication_token":"Pgszf-wE_8sdr6EVdUPR"}


// =========== AJAX GET CALL FOR WAVE FORECAST API DATA ==============

let getData = new XMLHttpRequest();

getData.onload = function () {
  if (this.readyState == 4 && this.status == 200) {
    let jsonData = JSON.parse(this.responseText);
    console.log(jsonData)
      // beachName(jsonData[0].data.attributes.name);
      swellHeight(jsonData[0].data.attributes.forecast_info.hourly.waveHeight);
      swellPeriod(jsonData[0].data.attributes.forecast_info.hourly.swellPeriod);
      swellDirection(jsonData[0].data.attributes.forecast_info.hourly.swellDirectionInWord);
      windDirection(jsonData[0].data.attributes.forecast_info.hourly.windDirectionInWord);
      liveBeachCam(jsonData[0].included[0].attributes.posts[0].video.poster);
  }
}

getData.open('GET', 'https://surfvideos.xyz/locations.json?southWest[latitude]=-8.814958&southWest[longitude]=115.258002&northEast[latitude]=-8.658183&northEast[longitude]=115.096524', true)
getData.setRequestHeader('X-User-Email', 'kkruelle2@gmail.com');
getData.setRequestHeader('X-User-Token', 'Pgszf-wE_8sdr6EVdUPR');
getData.setRequestHeader('Accept', 'application/json')
getData.setRequestHeader('Content-Type', 'application/json')
getData.send()

// function beachName(data){
//   document.getElementById('current-beach').innerHTML = data
// };

function swellHeight(data){
  document.getElementById('current-swell-height').innerHTML = '<span class="data-info">Wave Height: </span>' + data + ' ft.';
}

function swellPeriod(data){
  document.getElementById('current-swell-period').innerHTML = '<span class="data-info">Swell Period: </span>' + data + ' seconds';
}

function swellDirection(data){
  document.getElementById('current-swell-direction').innerHTML = '<span class="data-info">Swell Direction: </span>' + data;
}

function windDirection(data){
  document.getElementById('current-wind-direction').innerHTML = '<span class="data-info">Wind Direction: </span>' + data;
}

function liveBeachCam(data){
  document.getElementById('live-cam').innerHTML = data;
}

// ==== Getting Recipe API data ====

let hungryButton = document.getElementById('hungry-button').addEventListener('click', function() {

  document.getElementById('button-info').style.display = 'none';

  let getRecipes = new XMLHttpRequest();

  getRecipes.onload = function () {
    if (this.readyState == 4 && this.status == 200) {
      let jsonData = JSON.parse(this.responseText);
      console.log(jsonData)
        recipeTitle(jsonData.recipes[0].title)
        recipeSummary(jsonData.recipes[0].summary)
        steps(jsonData.recipes[0].instructions)
        img(jsonData.recipes[0].image)
    }
  }

  getRecipes.open('GET', 'https://api.spoonacular.com/recipes/random?apiKey=b271e78b662e4e7dbd236094b8a35482&includeNutrition=true', true);
  getRecipes.send();

  function recipeTitle(data) {
    document.getElementById('recipe-title').innerHTML = data;
  }

  function recipeSummary(data){
    document.getElementById('recipe-summary').innerHTML = data;
  }

  function steps(data) {
    document.getElementById('steps').innerHTML = data;
  }

  function img(data) {
    document.getElementById('img').innerHTML = data;
  }
  
})




