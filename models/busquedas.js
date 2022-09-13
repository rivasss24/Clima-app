const fs = require("fs");

const axios = require('axios');
const { pausa } = require("../helpers/inquirer"); 
class Busquedas {
    historial = [];
    dbPath = "./db/database.json";

    constructor() {
        //TODO leer DB si existe
        this.leerDB();
    }

    //Que es capitalizar
    get historialCapitalizado(){
        //Capitalizar cada palabra
        return this.historial.map( lugar => { 

             let palabras = lugar.split(" ");
             palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );

             return palabras.join(" ");
         }); 
    }

    async ciudades( lugar = "" ) {

        try {
 
        // peticion http 
        const token = process.env.MYMAPPI_KEY;
        const resp = await axios.get(`https://api.mymappi.com/v2/geocoding/direct?apikey=${token}&q=${lugar}`);

        //console.log(resp.data.data);
        //Numero de respuestas encontradas 
        //console.log(resp.data.data.length);

        return resp.data.data.map( lugar => ({
            nombre: lugar.display_name,
            pais: lugar.country,
            lat: lugar.lat,
            lng: lugar.lon,
        }));

        //retonar los lugares que coincidad
            
        } catch (error) {
            console.log(error);
            return [];
            //retornara un arreglo vacion
        }

    }

    async climaLugar( lat , lon ){
        try {
            const token = process.env.OPENWEATHER_KEY;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${token}&units=metric&lang=es`
            const resp = await axios.get(url);

            //conla respuesta hay que extraer la if de la data
            const { weather, main } = resp.data;
            const {temp, temp_min, temp_max } = main;
            return {
                desc: weather[0].description,
                temp,
                temp_min,
                temp_max,
            }
        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial( lugar = "" ){
        //prevenir duplicados

//El método includes() determina si una matriz incluye un determinado elemento
        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return;
        }
        this.historial = this.historial.slice(0,4);
        this.historial.unshift( lugar.toLocaleLowerCase());

        //grabar en DB
        this.guardarDB();
    }

    guardarDB(){
        //pay-load : carga-util
        const payLoad = {
            historial : this.historial,
        } 

        fs.writeFileSync( this.dbPath , JSON.stringify(payLoad) );
    }

    leerDB(){
        //Debe existir...
        if( !fs.existsSync( this.dbPath )) return;

        const info = fs.readFileSync( this.dbPath , { encoding: "utf-8" } );
        console.log(info);
        const data = JSON.parse( info );
        console.log( data );
        this.historial = data.historial;

    }

}

module.exports = Busquedas;


