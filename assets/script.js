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



function getWeather(event){
    event.preventDefault();

    var city = (document.getElementById('city').value.trim())
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
     "&units=imperial&appid=" +
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
    const {date}= data.list.dt
    data.forEach(element => {
        
    
       historyDiv =   document.createElement('div')
       historyDate = document.createElement('h2')
       historyTemp =  document.createElement('h2')
       historyImg =  document.createElement('img')
       historyDes =  document.createElement('h2')
       historyHum =  document.createElement('h2')

       historyDiv.id = "future"
       historyDate.id ="date"
       historyTemp.id = "temp-2"
       historyImg.id = "icon-2"
       historyDes.id = "description-2"
       historyHum.id = "humidity-2"
    });
    fiveDay.innerText =  + name;
    document.getElementById('date').innerText = date
    document.getElementById('icon-2').src = "https://openweathermap.org/img/wn/" + icon + ".png"
    document.getElementById('temp-2').innerText = temp +" °F"
    document.getElementById('description-2').innerText = description
    document.getElementById('humidity-2').innerText = "humidity: " + humidity;
   
  
}

//array of search history
let storeHistory = [];

//function to display search history
// function to create buttons on search history
function displayHistory(){
    for( var i = 0; i <localStorage.length; i++){
        var history = localStorage.key(i);
        storeHistory.push({text: history})
        historyList = document.createElement('div')
        history.classList.add('btn, col-4, shadow-0 , p-2, text-dark-emphasis, fs-4, bg-info-subtle')
        historyList.innerText = history
        listEl.append(historyList)
        $(listEl).on('click', weatherAgain)
    }
    function weatherAgain(event){
        event.preventDefault();

        var city = history
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
}
//function update search history

// get history from local storage
localStorage.setItem('city', JSON.stringify(city))

//function for geolocation and use function to make calls above

function geolocation {

}

