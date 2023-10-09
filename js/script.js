let API_KEY = "88a5217d29b4ed3e384419052b5a8299";
let setDatafunctionParam;
let setDatafunctionParam2;

async function setCitiesInModal(data) {
    for (let i = 0; i <= data.length-1; i++) {
        if ((data[i]["name"] == data[i]["state"]) || (data[i]["state"]==undefined) ) {
            modal_body.insertAdjacentHTML("beforeend", `
                <div class="px-8 py-1 cursor-pointer transition-all" onclick="
                    setDatafunctionParam1=undefined;
                    setDatafunctionParam2=[${data[i].lat}, ${data[i].lon}, '${data[i]["name"]}, ${data[i]["country"]}'];
                    SelectEffect(this)
                ">
                    <p class="text-xl transition-all">${data[i]["name"]}</p>
                    <p class="text-base transition-all">${data[i]["name"]} ,${data[i]["country"]}</p>
                </div>
            `)
        }
        else {
            modal_body.insertAdjacentHTML("beforeend", `
                <div class="px-8 py-1 cursor-pointer transition-all" onclick="
                    setDatafunctionParam1=undefined;
                    setDatafunctionParam2=[${data[i].lat}, ${data[i].lon}, '${data[i]["name"]}, ${data[i]["state"]}'];
                    SelectEffect(this)
                ">
                    <p class="text-xl transition-all">${data[i]["name"]}</p>
                    <p class="text-base transition-all">${data[i]["name"]} , ${data[i]["state"]}, ${data[i]["country"]}</p>
                    
                </div>
            `)
        }
    }
}

async function setData(city,cords) {
    let data;
    let temp = document.querySelector("#temp")
    let cityElem = document.querySelector(".city")
    let humidity = document.querySelector(".humidity")
    let wind = document.querySelectorAll(".wind")
    let realFeel = document.querySelector(".realfeel")
    let clouds = document.querySelector(".clouds")
    let pressure = document.querySelector(".pressure")
    let desc = document.querySelector(".desc")
    let icon = document.querySelector("#icon")
    
    if (cords==undefined) {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        data = await response.json();
    }else{
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cords[0]}&lon=${cords[1]}&appid=${API_KEY}&units=metric`)
        data = await response.json();
        data.name = cords[2]
    }
    try{
        temp.innerHTML = Math.round(data.main.temp) + "°C"
        humidity.innerHTML = Math.round(data.main.humidity) + "%"
        wind[0].innerHTML = Math.round(data.wind.speed) + " kmph"
        wind[1].innerHTML = Math.round(data.wind.speed) + " kmph"
        realFeel.innerHTML = Math.round(data.main.feels_like) + "°C"
        clouds.innerHTML = data.clouds.all
        pressure.innerHTML = data.main.pressure
        desc.innerHTML = data.weather[0].description
        icon.src = `img/icons/${data.weather[0].icon}.png`
        cityElem.innerHTML = data.name
    }catch(e){
        swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter correct city name.',
        })
    }
    
}

// GeoCoding API
async function searchCity(city) {
    let response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`)
    let data = await response.json()
    console.log(data)
    
    // Ask user for city if more than one city with same name or wrong city name
    if(data.length == 0){
        swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter correct city name.',
        })
    }
    else if (data.length>1) {
        setCitiesInModal(data)
        toggleModal()
    }else{
        setData(data[0].name)
    }
    
}
setData("Delhi")