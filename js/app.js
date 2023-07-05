//Declare constants
const heroWeatherImg = document.querySelector('.heroWeatherImg');
const todayTemp = document.getElementById('todayTemp');
const todayHiLo = document.getElementById('todayHiLo');
const city = document.getElementById('city');
const card1Img = document.querySelector('.card1Img');
const card2Img = document.querySelector('.card2Img');
const card3Img = document.querySelector('.card3Img');
const card1Day = document.querySelector('.card1Day');
const card2Day = document.querySelector('.card2Day');
const card3Day = document.querySelector('.card3Day');
const card1HiLo = document.querySelector('.card1HiLo');
const card2HiLo = document.querySelector('.card2HiLo');
const card3HiLo = document.querySelector('.card3HiLo');
const degreeSign = document.getElementById('degreeSign');
let cityName = 'Austin';

//Search input
const searchInput = document.querySelector('.searchInput');
searchInput.addEventListener('keypress', (e)=> {
    if (e.key === 'Enter') {
        cityName = searchInput.value;
        getWeatherData(cityName);
    };
})

//Celsius Farenheit toggle
const toggle = document.querySelector('.checkbox');
toggle.addEventListener('click', ()=> {
    console.log('clicked');
    getWeatherData(cityName);
});


//Fill in day and date info using date methods
const date = new Date();
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const month = months[date.getMonth()];
const day = date.getDate();
const year = date.getFullYear();
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weekdayAbrev = ['SUN', 'MON', 'TUES', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const dayOfWeek = weekdays[date.getDay()];
const weekday = document.getElementById('weekday');
weekday.innerText = dayOfWeek;
const todayDate = document.getElementById('date');
todayDate.innerText = month + " " + day + ", " + year;

function getWeatherData(cityName) {
    console.log('cityName', cityName);
    //Fetch current data from weather api
    fetch('https://api.weatherapi.com/v1/forecast.json?key=546ee103e45347e9b7f205740230407&days=4&q=' + String(cityName), {mode: 'cors'})
        .then(function(response) {
        return response.json();
        })
        .then(function(response) {
            console.log(response);
            if (response.location.region.length < 14 ) {
                let state = response.location.region;
                city.innerText = response.location.name + ", " + state;
            }
            else {
                let state = response.location.country;
                city.innerText = response.location.name + ", " + state;
            }
            if (toggle.checked) {
                //return farenheit values
                let degree = "°F";
                degreeSign.innerText = degree;
                todayTemp.innerText = String(Math.round(response.current.temp_f));
                
                //hi lo
                todayHiLo.innerText = Math.round(response.forecast.forecastday[0].day.mintemp_f) + "° / " + Math.round(response.forecast.forecastday[0].day.maxtemp_f) + "°";
                
                //cards
                card1HiLo.innerText = Math.round(response.forecast.forecastday[1].day.mintemp_f) + "° / " + Math.round(response.forecast.forecastday[1].day.maxtemp_f) + "°";
                card2HiLo.innerText = Math.round(response.forecast.forecastday[2].day.mintemp_f) + "° / " + Math.round(response.forecast.forecastday[2].day.maxtemp_f) + "°";
                card3HiLo.innerText = Math.round(response.forecast.forecastday[3].day.mintemp_f) + "° / " + Math.round(response.forecast.forecastday[3].day.maxtemp_f) + "°";
                let dateFromAPI_1 = String(response.forecast.forecastday[1].date);
                dateFromAPI_1 = dateFromAPI_1.replaceAll("-", ",");
                const d1 = new Date(dateFromAPI_1);
                card1Day.innerText = weekdayAbrev[d1.getDay()];
                let dateFromAPI_2 = String(response.forecast.forecastday[2].date);
                dateFromAPI_2 = dateFromAPI_2.replaceAll("-", ",");
                const d2 = new Date(dateFromAPI_2);
                card2Day.innerText = weekdayAbrev[d2.getDay()];
                let dateFromAPI_3 = String(response.forecast.forecastday[3].date);
                dateFromAPI_3 = dateFromAPI_3.replaceAll("-", ",");
                const d3 = new Date(dateFromAPI_3);
                card3Day.innerText = weekdayAbrev[d3.getDay()];

                //weather icons
                
            }
            else if (toggle.checked == false) {
                //return celsius values
                let degree = "°C";
                degreeSign.innerText = degree;
                todayTemp.innerText = String(Math.round(response.current.temp_c));
                
                //hi lo
                todayHiLo.innerText = Math.round(response.forecast.forecastday[0].day.mintemp_c) + "° / " + Math.round(response.forecast.forecastday[0].day.maxtemp_c) + "°";
                
                //cards
                card1HiLo.innerText = Math.round(response.forecast.forecastday[1].day.mintemp_c) + "° / " + Math.round(response.forecast.forecastday[1].day.maxtemp_c) + "°";
                card2HiLo.innerText = Math.round(response.forecast.forecastday[2].day.mintemp_c) + "° / " + Math.round(response.forecast.forecastday[2].day.maxtemp_c) + "°";
                card3HiLo.innerText = Math.round(response.forecast.forecastday[3].day.mintemp_c) + "° / " + Math.round(response.forecast.forecastday[3].day.maxtemp_c) + "°";
                let dateFromAPI_1 = String(response.forecast.forecastday[1].date);
                dateFromAPI_1 = dateFromAPI_1.replaceAll("-", ",");
                const d1 = new Date(dateFromAPI_1);
                card1Day.innerText = weekdayAbrev[d1.getDay()];
                let dateFromAPI_2 = String(response.forecast.forecastday[2].date);
                dateFromAPI_2 = dateFromAPI_2.replaceAll("-", ",");
                const d2 = new Date(dateFromAPI_2);
                card2Day.innerText = weekdayAbrev[d2.getDay()];
                let dateFromAPI_3 = String(response.forecast.forecastday[3].date);
                dateFromAPI_3 = dateFromAPI_3.replaceAll("-", ",");
                const d3 = new Date(dateFromAPI_3);
                card3Day.innerText = weekdayAbrev[d3.getDay()];
            }   

        });
}

getWeatherData(cityName);