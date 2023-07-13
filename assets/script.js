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
$(buttonEl).on('click',function(event){
    event.preventDefault();
    var city = (document.getElementById('city').value.trim())
    getWeather(city)
})

// function to display weather from fetch
//--need icon, temp,humidity,date,windspeed
//create elements for each


let storeHistory = JSON.parse(localStorage.getItem('cities')) || [];

function getWeather(city){
 
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
      forcast(city);

      weather.classList.remove('hide')
      fiveDay.classList.remove('hide')
    
}

 function displayCurrent (data){
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {temp, humidity}= data.main;
     
    let date  = dayjs().format("MM,DD,YYYY")

    weather.innerText =  name;
    document.getElementById('date').innerText = date
    document.getElementById('icon').src = "https://openweathermap.org/img/wn/" + icon + ".png"
    document.getElementById('temp').innerText = temp +" °F"
    document.getElementById('description').innerText = description
    document.getElementById('humidity').innerText = "humidity: " + humidity;
// if(!searchHisotry.includes(name)){
//     localStorage.setItem('citties', JSON.stringify(searchHisotry))
//     localStorage.getItem(searchHisotry)

// }
   saveHistory(name)
//    displayHistory()

}
// function to display 5 day forcast
 function forcast(city){
     fetch("https://api.openweathermap.org/data/2.5/forecast?q=" 
         + city 
         + "&units=imperial&appid=" 
          + myApi
     ).then((response) => {
        return response.json();
      })
      .then((data) => {
        
        futureDays(data);
    });
}
        
function futureDays(data){
    console.log(data);
    fiveDay.innerHTML = ""
   
    
    for( var i = 7; i < data.list.length; i += 8){
        const {name}= data.city
        const {icon, description} = data.list[i].weather[0];
        const {temp, humidity}= data.list[i].main
        const {date} = data.list[i].dt_txt
        var day  = dayjs(date).format("MM , DD , YYYY")
        console.log(temp);
        console.log(humidity);
        console.log(icon);
        console.log(description);

        // var pastSearch = searchHisotry;
        // pastCity.push({text: pastSearch})
       var historyDiv= document.createElement('div')
       var historyDate = document.createElement('h2')
       var historyTemp =  document.createElement('h2')
       var historyImg =  document.createElement('img')
       var historyDes =  document.createElement('h2')
       var historyHum =  document.createElement('h2')

        
       historyDiv.id = "future-" + i
       historyDate.id ="date-" + i
       historyTemp.id = "temp-" +i
       historyImg.id = "icon-" + i
       historyDes.id = "description-" + i
       historyHum.id = "humidity-" + i

        
       historyDiv.innerText = name
       historyDate.innerText = day
       historyImg.src = "https://openweathermap.org/img/wn/" + icon + ".png"
       historyTemp.innerText = temp +" °F"
       historyDes.innerText = description
       historyHum.innerText = "humidity: " + humidity;
        var historyContainer = document.createElement('div')
        historyContainer.classList.add('card','col-2','align-items-center', 'p-2', 'm-2')
    //     pastSearch.classList.add('btn, col-4, shadow-0 , p-2, text-dark-emphasis, fs-4, bg-info-subtle')
    //     historyDiv.innerText = pastSearch
        historyContainer.append(historyDiv, historyDate, historyTemp, historyImg, historyDes, historyHum)
       fiveDay.append(historyContainer)
    }
}
//        historyDiv =   document.createElement('div')
//        historyDate = document.createElement('h2')
//        historyTemp =  document.createElement('h2')
//        historyImg =  document.createElement('img')
//        historyDes =  document.createElement('h2')
//        historyHum =  document.createElement('h2')

//        historyDiv.id = "future"
//        historyDate.id ="date"
//        historyTemp.id = "temp-2"
//        historyImg.id = "icon-2"
//        historyDes.id = "description-2"
//        historyHum.id = "humidity-2"

//        fiveDay.append(historyDiv, historyDate, historyTemp, historImg, historyDes, historyHum)
//     });
//     fiveDay.innerText =  + name;
//     document.getElementById('date').innerText = date
//     document.getElementById('icon-2').src = "https://openweathermap.org/img/wn/" + icon + ".png"
//     document.getElementById('temp-2').innerText = temp +" °F"
//     document.getElementById('description-2').innerText = description
//     document.getElementById('humidity-2').innerText = "humidity: " + humidity;
   
  
// }

//array of search history



function saveHistory(city){
    if(!storeHistory.includes(city)){
storeHistory.push(city)
    localStorage.setItem('cities', JSON.stringify(storeHistory))
    displayHistory()
}
}

// //function to display search history
// // function to create buttons on search history
 function displayHistory(){
    listEl.innerHTML = ''
    for( var i = 0; i <storeHistory.length; i++){
        var history = storeHistory[i] 
        // storeHistory.push(history)
        historyList = document.createElement('div')
        historyList.setAttribute('class' ,'btn  shadow-0  p-2 text-dark-emphasis fs-4 bg-info-subtle  w-2')
        historyList.innerText = history
        listEl.append(historyList)
        $(listEl).on('click', function(event){
            var historyCity = event.target.innerText
            getWeather(historyCity)
        })
        
    }
    
    
}



//     function weatherAgain(event){
//         event.preventDefault();

//         var city = history
//     fetch(
//         "https://api.openweathermap.org/data/2.5/weather?q=" 
//         + city 
//         + "&units=imperial&appid=" 
//         + myApi
//     )
//     .then((response) => {
//         return response.json();
//       })
//       .then((data) => displayCurrent(data));
//       forcast(city)
//     }
// }
//function update search history

// get history from local storage

displayHistory()