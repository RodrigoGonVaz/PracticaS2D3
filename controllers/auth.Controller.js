//1.IMPORT
const User = require("./../models/User.Model")
//Libreria para encriptar (npm install bcryptjs)
const bcryptjs = require("bcryptjs")

//CREAR
//VISTA
exports.viewRegister = (req, res) => {
	res.render("auth/signup")
}

//Form
exports.register = async (req, res) => {

	//Obtener datos del formulario
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    // console.log(username, email, password) //<--- si existe la contraseña en este punto

    //A). VALIDACION
    //Verificar que usarname, email y pass que no lleguen vacios
    if (!username || !email || !password) {
        res.render("auth/signup", {
            errorMessage: "Uno o mas campos estan vacios"
        })
        return  //termina la funcion si no existe alguno de estos datos
    }

    //B). VALIDACION (fortalecimiento de pass)
    //Verificar que el pass tenga 6 caracteres, minimo un numero, una mayuscula.
    //https://regexr.com/ (un conjunto de texto que audita un texto)
	const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/

	if(!regex.test(password)){
		
		res.render("auth/signup", {
			errorMessage: "Tu password debe de contener 6 caracteres, mínimo un número y una mayúscula."
		})		

		return
	}

    //2. Encriptacion de Password  🚩🚩🚩🚩

try {

    //Revolver 10 veces la password 👇 
    const salt = await bcryptjs.genSalt(10)
    const passwordEncriptado = await bcryptjs.hash(password,salt)
    
    console.log(passwordEncriptado) //<--- pass encriptado

    const newUser = await User.create({
        username,
        email,
        passwordEncriptado
    })
        console.log(newUser)
        res.redirect("/auth/login")

 } catch(error){
    res.status(500).render("auth/signup", { //Error en la base de datos
        errorMessage: "Hubo un error - email no valido, no dejes espacios, usa minusculas y que sea unico"
    }) 
 }
}

//----------------------LOG IN----------------------
exports.viewLogin = (req, res) => {
	res.render("auth/login")
}

exports.login = async(req, res) => {
	
    try {

        //1. OBTENCION DE DATOS DEL FORM
        const email = req.body.email
        const password = req.body.password
    
            console.log(email, password)

        //2. VALIDACION DE USUARIO ENCONTRADO EN BD
        const foundUser = await User.findOne({ email })
        console.log(foundUser) // <-- Manda todos los datos del usuario (objeto)
        if(!foundUser){
            res.render("auth/login", {
                errorMessage: "Email o contraseña sin coincidencia. 🥪 "
            })
            return
        }

        //3. VALIDACION DE CONTRASEÑA
        //COMPRAR LA CONTRASEÑA DEL FORMULARIO vs.. LA BD
        //toma las dos contraseñas form y bd y los compara <---compareSync regresa un true o false
        const verifiedPass = await bcryptjs.compareSync(password, foundUser.passwordEncriptado)
        if (!verifiedPass) {
            res.render("auth/login",{
                errorMessage: "Email o contraseña erronea"
            })
            return
        
        }
        // console.log("password", password)
	    // console.log("foundUser.password:", foundUser.passwordEncriptado)
	    // console.log("verifiedPass", verifiedPass) //<---- true

        //4. GENERAR LA SESION - DESDE EL SERVIDOR MANDAMOS COOKIE (ARCHIVO QUE CONTIENE LA INFO DEL USUARIO)
        //PERSISTENCIA DE IDENTIDAD - TITULA DE CIERTAS AREAS PRIVADAS
        req.session.currentUser = {
            _id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
            mensaje: "Lo logramos YEIIII"
        }
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
        
        //5. REDIRECCIONAR AL HOME
        res.redirect("/users/profile")


        
    } catch (error){
        console.log(error)
    }
}

//--------------------------LOGOUT------------------------
//Session en MONGO DB no aparece
exports.logout = async(req,res) =>{
    req.session.destroy((error) =>{
        //Se evalua so Hubo un error al borrar la cookie
        if (error) {
            console.log(error)
            return
        }
        res.redirect("/")
    })
}
