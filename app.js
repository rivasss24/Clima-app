
//nota: obtener posicion actual de el usuario 
require('dotenv').config();
require("colors");
const {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoCheckList} = require("./helpers/inquirer.js");
const Busquedas = require("./models/busquedas.js");


const main = async () => { 
    const busquedas = new Busquedas();

    let opt;

    do {

    opt = await inquirerMenu();

    // console.log(opt);
    // await pausa();

    switch(opt){
        case 1:
            // mostrar el mensaje
            const lugar = await leerInput(`City you want to search: `);
            // mostrar los lugares 
            const lugares = await busquedas.ciudades( lugar );
            console.log(`\nInformacion de las ciudaddes\n`.yellow);
            // seleccinar el lugar 
            const placeSelected = await listarLugares(lugares);
            if(placeSelected === 0 ) continue

            //Guardar en DB
            
            const { 
                nombre,
                pais,
                lat,
                lng } = lugares[placeSelected-1];
                
                busquedas.agregarHistorial(nombre);
                //busquedas.guardarDB();
            //Clima
            const { 
                   temp,
                   temp_min,
                   temp_max,
                   desc } = await busquedas.climaLugar(lat,lng);
            await busquedas.climaLugar(lat,lng);

            console.clear();
            console.log(`Ciudad: ${nombre}`.green);
            console.log(`Pais: ${pais}`.yellow);
            console.log(`Lat: ${lat}`);
            console.log(`Lng: ${lng}`);
            console.log("\n");
            console.log("CLIMA".green);
            console.log(`Temperatura: ${temp}`);
            console.log(`Tminima: ${temp_min}`);
            console.log(`Tmaxima; ${temp_max}`);
            console.log(`Descripcion: ${desc}`)
            console.log("\n");

            // obtendre los datos de el clima 
            // mostrar resultados de el clima  
            //console.log(`opt ${opt}`);

              
            await pausa();
    
        break;
        
        case 2:
            busquedas.historialCapitalizado.forEach( ( lugar , i) => {
                console.log(`${i+1}.- ${lugar}`);
            });
            await pausa();
        break;
    }
    
    if( opt === 0){
        console.clear();
        // await pausa(); 
    }
    }
    while(opt !== 0 );
    // pausa();
}

main();