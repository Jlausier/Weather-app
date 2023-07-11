var weather = document.getElementById('searched-day')
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
    
    .then((response) => response.json())
    .then((data) => console.log(data)) 
    
    
displayCurrent: function(data){
    const {name} = data;
    const {icon, description} = data.weather;

}
    
}


// function to display 5 day forcast


//array of search history

//function to display search history

//function update search history

//function to get history from local storage


//function for geolocation and use function to make calls above

// function to create buttons on search history

