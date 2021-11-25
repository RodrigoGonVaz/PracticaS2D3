//GESTION DE LA SESION
//CONFIG
//TIEMPO DE EXPIRACION DE LA SESION

//1. IMPORT
const session = require("express-session")
const MongoStore = require("connect-mongo")



//2.GESTION DE SESION
const sessionManager = (app) =>{

    console.log("Activando y gestionando sesiones")
    //a. Establecer seguridad y flexibilidad ante servidores externos, puntualmente Cloud (Heroku)
    app.set("trust proxy", 1) // confiar en todos los elementos clouds que se puedan conectar a mi proyecto

    //b. Establecer la configuracion de la sesion
    app.use(session({   //invoca la libreria que importamos
        secret: process.env.SESSION, //palabra secreta para dar seguridad al servidor - para coincidir en el servidor
        resave: true, // tan pronto borrermos una cookie - forza la insersion del cookie, si se vuelve a conectar al mismo servidor
        saveUninitialized: false, // si no hay cookie, no te inserta la cookie hasta que iniciar sesion
        cookie: { //Archivo unico que se genera en el servidor con los datos elegidos del usuario y se envia parcialmente una copia de los datos a la base de datos y la cookie se envia al cliente.
            httpOnly: true, // seguridad de manejo de injecciones - ataques al servidor
            maxAge: 86400000 //Expiracion del token en mil/seg 1000*60*60*24 = 1 dia
        },
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI 
        }) 

    })) 
        //CARPETA DE SESSION EN MONGODB
        /*_id: "FqiCmtZZVqgqOPP17ih0bqEtLB0mlomP"
        expires: 2021-11-26T17:19:54.341+00:00
        Datesession: {
            "cookie":{
                "originalMaxAge":86400000,
                "expires":"2021-11-26T17:19:54.341Z",
                "httpOnly":true,
                "path":"/"
            },
            "currentUser":{
                "_id":"619fb7d41d0338638c1c1580",
                "username":"HolaMundo",
                "email":"iron@iron.com",
                "mensaje":"Lo logramos YEIIII"}}*/

}


//3.EXPORT

module.exports = sessionManager