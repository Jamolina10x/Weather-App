let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

// API Key
const key = "99d35c962663d7a48fb3a0e14a678d8a";

//Function to fetch weather details from api and display them
let getWeather = async () => {
  let cityValue = cityRef.value;
  //If input field is empty
  if (cityValue.length == 0) {
    result.innerHTML = `<h3>Please enter a city name</h3>`;
  }
  //If input field is NOT empty
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;

    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }

    let data = await response.json();
    //If city name is valid
    console.log(data);
    console.log(data.weather[0].icon);
    console.log(data.weather[0].main);
    console.log(data.weather[0].description);
    console.log(data.name);
    console.log(data.main.temp_min);
    console.log(data.main.temp_max);
    result.innerHTML = `
        <h2>${data.name}</h2> 
        <h4 class="weather">${data.weather[0].main}</h4>
        <h4 class="desc">${data.weather[0].description}</h4>
        <img src ="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h1>${data.main.temp}&#176;</h1>
        <div class="temp-container">
          <div>
            <h4 class="title">Min Temp: ${data.main.temp_min}&#176;</h4>
          </div>
          <div>
            <h4 class="title">Max Temp: ${data.main.temp_max}&#176;</h4>
          </div>
        </div>
        `;
  } catch {
    //If city name is NOT valid
    result.innerHTML = `<h3>${error.message}</h3>`;
  }
};
searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);
