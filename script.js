let loc = document.getElementById('location');
let tempIcon = document.getElementById("temp-icon");
let tempValue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconFile;

window.addEventListener("load", ()=>{
    let long;
    let lat;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            long=position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid={f110de00af23edfc6e79284103075b2c}`;
            fetch(api)
                .then((response) => {
                    return response.json();
                })
                .then(data => {
                    const {name} = data;
                    const {feels_like} = data.main;
                    const{id, main} = data.weather[0];
                    loc.textContent = name;
                    climate.textContent = main;
                    tempValue.textContent = Math.round(feels_like -273);
                    if(id<250){
                        tempIcon.src = 'icons/storm.svg'
                    }
                    else if(id<350){
                        tempIcon.src = 'icons/drizzle.svg'
                    }
                    else if(id<550){
                        tempIcon.src = 'icons/rain.svg'
                    }
                    else if(id<650){
                        tempIcon.src = 'icons/snow.svg'
                    }
                    else if(id<800){
                        tempIcon.src = 'icons/atmosphere.svg'
                    }
                    else if(id===800){
                        tempIcon.src = 'icons/clear.svg'
                    }
                    else if(id>800){
                        tempIcon.src = 'icons/clouds.svg'
                    }
                    
                    console.log(data);
                })
        })
    }
})