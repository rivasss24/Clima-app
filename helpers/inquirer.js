const inquirer = require("inquirer");
require("colors");

const preguntas = [
    {
        type: "list",
        name: "opcion",
        message: "¿Que desea hacer?",
        choices: [
            {
                value:1,
                name:`${"1.-".yellow} Search location`,
            },
            {
                value:2,
                name:`${"2.-".yellow} Search history`,
            },
            {
                value:0,
                name:`${"0.-".yellow} Exit`,
            },
        ]
    }
]

const inquirerMenu = async() =>{
    
    console.clear();
    console.log("=======================".yellow);
    console.log(" Seleccione una opción ".yellow);
    console.log("=======================\n".yellow);

    const { opcion } = await inquirer.prompt(preguntas);
    
    return opcion;
}

const pausa = async() =>{

    const question = [
        {
            type: "input",
            name: "enter",
            message: `Presione ${"ENTER".green} para continuar`
        }
    ]

    console.log("\n");

    await inquirer.prompt(question);
}

const leerInput = async(message)=>{

    const question = [
    {
        type: "input",
        name: "desc",
        message,
        validate( value ) {
            if( value.length === 0){
                return "Por favor ingrese un valor";
            }
            return true
        }

    }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;

}

    
    //console.log(choices);

    const listarLugares = async(lugares = []) => {

        // Buscar la diferencia entre map & forEach
        
        const choices = lugares.map( (lugar, i)  => {
            
            const idx = `${i +1}.-`.yellow;
    
            return {
                // El value es el valor que va a devolver 
                value: i+1,
                //value: [ lugar.lat , lugar.lng ],
                name: `${idx} ${ lugar.nombre}`
            }
        });
    
        
        choices.unshift({
            value: 0,
            name: "0.-".yellow + " cancelar".red
        });
        


// ------------------------------------------------------------------------
    const preguntas = [
        {
            type: "list",
            name: "id",
            message: "Seleccione una locacion",
            // choices : choices,
            choices,
        }
    ];

    console.clear();
    const { id } = await inquirer.prompt(preguntas);

    return id; 
}

const confirmar = async(message) => {
    const question = [
        {
            type:"confirm",
            name: "ok",
            message
        }
    ];

    const { ok } = await inquirer.prompt(question); 
    return ok;
}

const mostrarListadoCheckList = async( tareas = [] ) => {
    
    const choices = tareas.map((tarea, i) => {
    
        const idx = `${i + 1}.-`.yellow;

        return{
            value: tarea.id,
            name: `${idx} ${ tarea.desc}`,
            checked: true,
            // Lo siguiente es para mostrar marcadas las tareas completadas
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: "checkbox",
            name: "ids",
            menssage:"Seleccione",
            choices,
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}
 
module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    confirmar,
    mostrarListadoCheckList,
    listarLugares,
}