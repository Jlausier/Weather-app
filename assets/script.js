var weather = document.getElementById('searched-city')
var fiveDay = document.getElementById('future')
var listEl = document.getElementById('previous')
var farenheit = document.getElementById('Farenheit')
var celsius = document.getElementById('celsius')
var buttonEl = document.getElementById('button')

var myApi = "0798b2213871a3519588b870cc87e7a2"
//url with api key
var weatherUrl = ""
//add event listner
$(buttonEl).on('click',getWeather)

// function to display weather from fetch
//--need icon, temp,humidity,date,windspeed
//create elements for each



function getWeather(){
    
    var city = (document.getElementById('city').value)
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&units=imperial&appid=" 
        + myApi
    )
    .then((response) => {
        return response.json();
      })
      .then((data) => displayCurrent(data));
      forcast()
    
}

 function displayCurrent (data){
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {temp, humidity}= data.main;
    weather.innerText =  name;
    document.getElementById('icon').src = "https://openweathermap.org/img/wn/" + icon + ".png"
    document.getElementById('temp').innerText = temp +" °F"
    document.getElementById('description').innerText = description
    document.getElementById('humidity').innerText = "humidity: " + humidity;
   

}
    



    

// function to display 5 day forcast
function forcast(){
    
    
 fetch(
    

    "https://api.openweathermap.org/data/2.5/forecast?" +
     "lat=" + lat+
     "&lon=" + lon+
     "&appid=" + myApi
 ).then((response) => {
    return response.json();
  })
  .then((data) => displayFuture(data));
}

function displayFuture(){
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {temp, humidity}= data.main;
    fiveDay.innerText =  + name;
    document.getElementById('icon-2').src = "https://openweathermap.org/img/wn/" + icon + ".png"
    document.getElementById('temp-2').innerText = temp +" °F"
    document.getElementById('description-2').innerText = description
    document.getElementById('humidity-2').innerText = "humidity: " + humidity;
   
  
}

//array of search history
localStorage.setItem('city', JSON.stringify(city))
//function to display search history

//function update search history

//function to get history from local storage


//function for geolocation and use function to make calls above

// function to create buttons on search history

