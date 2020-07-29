const COORDS ='coords';
const weatherContainer = document.querySelector('.weather');
const tempContainer = weatherContainer.querySelector('#temp');
const locaContainer = weatherContainer.querySelector('#loca');
const API_KEY='bdfe18f8717d6be8e6de1a7af9aa6556'
function getweather(lat, lon ){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(response=>{
        return response.json();
    })
    .then(json=>{
        const temp = json.main.temp;
        const place = json.name;
        const nowWeather = json.weather[0].main;
        tempContainer.innerText=`${ nowWeather}, ${temp}`;
        locaContainer.innerText=`${place}`;
    })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handleGeoSuccess(position){
        const latitude= position.coords.latitude;
        const longitude = position.coords.longitude;
        const coordsObj ={
            latitude,
            longitude
        }
        saveCoords(coordsObj);
        getweather(latitude,longitude);
}
function handleGeoError(){
        console.log('cant access');
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}
function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS);
    if(loadedCords === null){
        askForCoords();
    }else{
        const parsedCords = JSON.parse(loadedCords);
        getweather(parsedCords.latitude, parsedCords.longitude);

    }
}
function init(){
    loadCoords();

}

init();