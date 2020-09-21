navigator.geolocation.getCurrentPosition(GeoPosicion, error);
const ClimaActual = document.querySelector('.ClimaContainer');
const Posicion = document.querySelector('#Posicion');
const FechaTop = document.querySelector('#Fecha');
const DiasContList = document.querySelectorAll('div.DiasContainer li');

let Kelvin = 273.15;

function GeoPosicion(pos) {
    const latitude = pos.coords.latitude;
    const longitude = pos.coords.longitude;

    WaterApi(latitude, longitude);
    DiaMenosUno(latitude, longitude);
    DiaMenosDos(latitude, longitude);
    DiaMenosTres(latitude, longitude);
    DiaMenosCuatro(latitude, longitude);
}

function error() {
    Posicion.innerText = 'NA';
    FechaTop.innerText = 'NA';
    ClimaActual.innerHTML = `
                <p>NA</p>
                <img src="img/unknow.png" class="ImgNot">
                <p class="PNot">NA°<span>c</span></p>
                <p>NA</p>
                 <div class="Punto"></div>
            `;
    DiasContList.forEach(element => {
        element.innerHTML = `
                <img class="ImgDiaNot" src="img/unknow.png">
                <p>NA</p>
                <p>NAºc</p>
            `;
    });
    document.querySelector('.LoaderPage').style.display = 'none';
    document.querySelector('#Velviento').innerText = 'NA';
    document.querySelector('#Humedad').innerText = 'NA';
    document.querySelector('#Nubosidad').innerText = 'NA';
    document.querySelector('#Visibilidad').innerText = 'NA';
    document.querySelector('#DireccionViento').innerText = 'NA';

    document.querySelector('section.MenuMobil #Velviento').innerText = 'NA';
    document.querySelector('section.MenuMobil #Humedad').innerText = 'NA';
    document.querySelector('section.MenuMobil #Nubosidad').innerText = 'NA';
    document.querySelector('section.MenuMobil #Visibilidad').innerText = 'NA';
    document.querySelector('section.MenuMobil #DireccionViento').innerText = 'NA';
}

function WaterApi(latitude, longitude) {
    const Key = '08789ab932af5d6de716da1eaa4cfca7';
    const Url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Key}`;

    fetch(Url)
        .then(res => {
            const Datos = res.json();
            return Datos;
        })
        .then(datos => {

            let Fecha = new Date();
            let FechaActualizado = new Date(datos.sys.sunset * 1000).toLocaleDateString(`${datos.sys.country}`);
            let Dia = Fecha.getDay();
            let DiasSemana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

            let Celsius = Math.ceil(datos.main.temp - Kelvin);
            Posicion.innerText = `${datos.sys.country} - ${datos.name}`;
            FechaTop.innerText = `${FechaActualizado}`;

            document.querySelector('#Velviento').innerText = `${datos.wind.speed}m/s`;
            document.querySelector('#Humedad').innerText = `${datos.main.humidity}%`;
            document.querySelector('#Nubosidad').innerText = `${datos.clouds.all}%`;
            document.querySelector('#Visibilidad').innerText = `${datos.visibility}m`;
            document.querySelector('#DireccionViento').innerText = `${datos.wind.deg}°`;

            document.querySelector('section.MenuMobil #Velviento').innerText = `${datos.wind.speed}m/s`;
            document.querySelector('section.MenuMobil #Humedad').innerText = `${datos.main.humidity}%`;
            document.querySelector('section.MenuMobil #Nubosidad').innerText = `${datos.clouds.all}%`;
            document.querySelector('section.MenuMobil #Visibilidad').innerText = `${datos.visibility}m`;
            document.querySelector('section.MenuMobil #DireccionViento').innerText = `${datos.wind.deg}°`;

            ClimaActual.innerHTML = `
                <p>${DiasSemana[Dia]}</p>
                <img src="img/animated/${datos.weather[0].icon}.svg">
                <p>${Celsius}°<span>c</span></p>
                <p>${datos.weather[0].main}</p>
                 <div class="Punto"></div>
            `;
            document.querySelector('.LoaderPage').style.display = 'none';
        })
        .catch(error => {
            console.log(error);
        })
}

const InsertHora = document.querySelector('#Hora');
const InsertHoraMobil = document.querySelector('section.MenuMobil #Hora');

function HoraActualidad() {
    const HoraActual = new Date();
    let Hora = HoraActual.getHours();
    let Minuto = HoraActual.getMinutes();
    let Segundo = HoraActual.getSeconds();
    let Horario;

    if (Hora > 0 && Hora <= 12) {
        Horario = 'AM';
        InsertHora.innerText = `${Hora}:${Minuto}:${Segundo}  ${Horario}`;
        InsertHoraMobil.innerText = `${Hora}:${Minuto}:${Segundo}  ${Horario}`;
    }
    if (Hora > 12 && Hora <= 24) {
        Horario = 'PM';
        InsertHora.innerText = `${Hora}:${Minuto}:${Segundo}  ${Horario}`;
        InsertHoraMobil.innerText = `${Hora}:${Minuto}:${Segundo}  ${Horario}`;
    }
}

setInterval(() => {
    HoraActualidad();
}, 1000);

const Menu = document.querySelector('#Menu');
let MenuOpen = false;

Menu.addEventListener('click', () => {
    if (MenuOpen == false) {
        document.querySelector('nav').style.display = 'none';
        document.querySelector('header').style.padding = '0 0 0 50px';
        MenuOpen = true;
    } else if (MenuOpen == true) {
        document.querySelector('nav').style.display = 'block';
        document.querySelector('header').style.padding = '0 0 0 250px';
        MenuOpen = false;
    }
});


setTimeout(() => {
    document.querySelector('#LodInfo1').style.display = 'none';
    document.querySelector('#LodInfo2').style.display = 'block';
}, 1300);


const MenuMobil = document.querySelector('#MenuMobil');
let MenuOpenMobil = false;

MenuMobil.addEventListener('click', () => {
    if (MenuOpenMobil == false) {
        document.querySelector('.MenuMobil').style.display = 'block';
        MenuOpenMobil = true;
    } else if (MenuOpenMobil == true) {
        document.querySelector('.MenuMobil').style.display = 'none';
        MenuOpenMobil = false;
    }
});

/* DIA MENOS UNO */

const LIMenosuno = document.querySelector('#DiaMenos1');

function DiaMenosUno(latitude, longitude) {
    const Key = '08789ab932af5d6de716da1eaa4cfca7';

    //Fecha +1
    let FechaSiguienteUno = new Date();
    let Ano = FechaSiguienteUno.getFullYear();
    let Mes = FechaSiguienteUno.getMonth();
    let Dia = FechaSiguienteUno.getDate() - 1;
    let unixTime = Math.round(new Date(Ano, Mes, Dia) / 1000);

    const Url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latitude}&lon=${longitude}&dt=${unixTime}&appid=${Key}`;
    let DiasSemana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

    fetch(Url)
        .then(res => {
            let Respuesta = res.json();
            return Respuesta;
        })
        .then(datos => {

            let GradosDia = datos.hourly[0];
            let NombreDay = new Date(Ano, Mes, Dia);
            let Celsius = Math.ceil(GradosDia.temp - Kelvin);
            LIMenosuno.innerHTML = `
                <img src="img/animated/${GradosDia.weather[0].icon}.svg">
                <p>${DiasSemana[NombreDay.getDay()]}</p>
                <p>${Celsius}ºc</p>
            `;
        })
        .catch(error => {
            console.log(error);
        })
}

/* DIA MENOS DOS*/

const LIMenosdos = document.querySelector('#DiaMenos2');

function DiaMenosDos(latitude, longitude) {
    const Key = '08789ab932af5d6de716da1eaa4cfca7';

    //Fecha +1
    let FechaSiguienteUno = new Date();
    let Ano = FechaSiguienteUno.getFullYear();
    let Mes = FechaSiguienteUno.getMonth();
    let Dia = FechaSiguienteUno.getDate() - 2;
    let unixTime = Math.round(new Date(Ano, Mes, Dia) / 1000);

    const Url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latitude}&lon=${longitude}&dt=${unixTime}&appid=${Key}`;
    let DiasSemana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

    fetch(Url)
        .then(res => {
            let Respuesta = res.json();
            return Respuesta;
        })
        .then(datos => {

            let GradosDia = datos.hourly[0];
            let NombreDay = new Date(Ano, Mes, Dia);
            let Celsius = Math.ceil(GradosDia.temp - Kelvin);
            LIMenosdos.innerHTML = `
                <img src="img/animated/${GradosDia.weather[0].icon}.svg">
                <p>${DiasSemana[NombreDay.getDay()]}</p>
                <p>${Celsius}ºc</p>
            `;
        })
        .catch(error => {
            console.log(error);
        })
}

/* DIA MENOS TRES*/

const LIMenostres = document.querySelector('#DiaMenos3');

function DiaMenosTres(latitude, longitude) {
    const Key = '08789ab932af5d6de716da1eaa4cfca7';

    //Fecha +1
    let FechaSiguienteUno = new Date();
    let Ano = FechaSiguienteUno.getFullYear();
    let Mes = FechaSiguienteUno.getMonth();
    let Dia = FechaSiguienteUno.getDate() - 3;
    let unixTime = Math.round(new Date(Ano, Mes, Dia) / 1000);

    const Url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latitude}&lon=${longitude}&dt=${unixTime}&appid=${Key}`;
    let DiasSemana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

    fetch(Url)
        .then(res => {
            let Respuesta = res.json();
            return Respuesta;
        })
        .then(datos => {

            let GradosDia = datos.hourly[0];
            let NombreDay = new Date(Ano, Mes, Dia);
            let Celsius = Math.ceil(GradosDia.temp - Kelvin);
            LIMenostres.innerHTML = `
                <img src="img/animated/${GradosDia.weather[0].icon}.svg">
                <p>${DiasSemana[NombreDay.getDay()]}</p>
                <p>${Celsius}ºc</p>
            `;
        })
        .catch(error => {
            console.log(error);
        })
}

/* DIA MENOS CUATRO*/

const LIMenoscuatro = document.querySelector('#DiaMenos4');

function DiaMenosCuatro(latitude, longitude) {
    const Key = '08789ab932af5d6de716da1eaa4cfca7';

    //Fecha +1
    let FechaSiguienteUno = new Date();
    let Ano = FechaSiguienteUno.getFullYear();
    let Mes = FechaSiguienteUno.getMonth();
    let Dia = FechaSiguienteUno.getDate() - 4;
    let unixTime = Math.round(new Date(Ano, Mes, Dia) / 1000);

    const Url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${latitude}&lon=${longitude}&dt=${unixTime}&appid=${Key}`;
    let DiasSemana = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

    fetch(Url)
        .then(res => {
            let Respuesta = res.json();
            return Respuesta;
        })
        .then(datos => {

            let GradosDia = datos.hourly[0];
            let NombreDay = new Date(Ano, Mes, Dia);
            let Celsius = Math.ceil(GradosDia.temp - Kelvin);
            LIMenoscuatro.innerHTML = `
                <img src="img/animated/${GradosDia.weather[0].icon}.svg">
                <p>${DiasSemana[NombreDay.getDay()]}</p>
                <p>${Celsius}ºc</p>
            `;
        })
        .catch(error => {
            console.log(error);
        })
}