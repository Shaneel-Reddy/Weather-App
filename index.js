const apikey="b79393ebecec92bf40a2ddb6c6be5536";
const apiurl="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const forecasturl = "https://api.openweathermap.org/data/2.5/forecast?&units=metric&q=";

const searchbox=document.querySelector(".search input");
const searchbtn=document.querySelector(".search button");
const weathericon=document.querySelector(".weather-icon");


async function checkWeather(city)
{
    const response = await fetch(apiurl+city+`&appid=${apikey}`);
    const data=await response.json();


    if(response.status == 404 ){
            document.querySelector(".error").style.display="block";
            document.querySelector(".weather").style.display="none";
            document.querySelector(".fiveday").style.display="none";
    }
    else{


    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML= Math.round(data.main.temp)+"°c";
    document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
    document.querySelector(".wind").innerHTML=data.wind.speed+"km/h";


    if(data.weather[0].main=="Clouds"){
        weathericon.src="weather-app-img/images/clouds.png"
    }
    else if(data.weather[0].main=="Clear"){
        weathericon.src="weather-app-img/images/clear.png"
    }
    else if(data.weather[0].main=="Rain"){
        weathericon.src="weather-app-img/images/rain.png"
    }
    else if(data.weather[0].main=="Drizzle"){
        weathericon.src="weather-app-img/images/drizzle.png"
    }
    else if(data.weather[0].main=="Mist"){
        weathericon.src="weather-app-img/images/mist.png"
    }

    document.querySelector(".fiveday").style.display="flex";
    document.querySelector(".weather").style.display="block";
    document.querySelector(".error").style.display="none";
    const forecastResponse = await fetch(forecasturl + city + `&appid=${apikey}`);
    const forecastData = await forecastResponse.json();
    console.log(forecastData);
    updateFiveDayForecast(forecastData);

}
function updateFiveDayForecast(forecastData) {
    const dayElements = document.querySelectorAll(".day");
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    console.log(forecastData);
    for (let i = 0; i < 5; i++) {
        
        const forecast = forecastData.list[i * 8];
        const date = new Date(forecast.dt * 1000);
        const dayName = days[date.getDay()];
        
        dayElements[i].querySelector(".day-name").textContent = dayName;
        dayElements[i].querySelector(".day-icon").src = `weather-app-img/images/${forecast.weather[0].main.toLowerCase()}.png`;
        dayElements[i].querySelector(".day-temp").textContent = Math.round(forecast.main.temp) + "°c";
        dayElements[i].querySelector("img").style.display="block";
    }
    
    
}

}  
searchbtn.addEventListener("click",()=>{
    checkWeather(searchbox.value);
});
