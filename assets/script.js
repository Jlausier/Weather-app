var weather = document.getElementById('searched-city')
var fiveDay = document.getElementById('5-day')
var listEl = document.getElementById('previous')
var farenheit = document.getElementById('Farenheit')
var celsius = document.getElementById('celsius')
var buttonEl = document.getElementById('button')
var baseUrl ="https://api.openweathermap.org/data/2.5/weather?"
var myApi = "0798b2213871a3519588b870cc87e7a2"
//url with api key
var weatherUrl = ""
//add event listner
$(buttonEl).on('click',getWeather)

// function to display weather from fetch
//--need icon, temp,humidity,date,windspeed
//create elements for each

function getWeather(){
  

    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=metric&appid=" 
        + this.myApi
    )
    .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayCurrent(data));
    
    
displayCurrent: function(data){
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {temp, humidity}= data.main;
    weather.innerText = "Weather in " + name;
    document.getElementById('icon').src = "https://openweathermap.org/img/wn/" + icon + ".png"
    document.getElementById('temp').innerText = temp +" °C"
    document.getElementById('description').innerText = description
    document.getElementById('humidity').innerText = humidity


}
    
}

function search(){
    this.getWeather(document.getElementById('input').value)
}
// function to display 5 day forcast


//array of search history

//function to display search history

//function update search history

//function to get history from local storage


//function for geolocation and use function to make calls above
let geocode ={
    reverseGeocode: function(latitude, longitude){
    var apiUrl = 'https://api.opencagedata.com/geocode/v1/json';

    var requestUrl = apiUrl
    + "?"
    + "key="
    + myApi
    + "&q="
    + encodeURIComponent(latitude + "," + longitude)
    + "&pretty=1"
    + "&no_annotations=1"

    var request = new XMLHttpRequest();
    request.open("GET", requestUrl, true);

    request.onload = function () {

      if (request.status == 200) {
        var data = JSON.parse(request.responseText);
        weather.getWeather(data.results[0].components.city);
        console.log(data.results[0].components.city)
      } else if (request.status <= 500) {

        console.log("unable to geocode! Response code: " + request.status);
        var data = JSON.parse(request.responseText);
        console.log("error msg: " + data.status.message);
      } else {
        console.log("server error");
      }
    };

    request.onerror = function () {
      console.log("unable to connect to server");
    };

    request.send(); 
  },
  getLocation: function() {
    function success (data) {
      geocode.reverseGeocode(data.coords.latitude, data.coords.longitude);
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, console.error);
    }
    else {
      weather.getWeather("orlando");
    }
  }
};

geocode.getLocation();
// function to create buttons on search history

