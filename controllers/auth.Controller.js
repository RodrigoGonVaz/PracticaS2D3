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
        res.redirect("/")

 } catch(error){
    res.status(500).render("auth/signup", { //Error en la base de datos
        errorMessage: "Hubo un error - email no valido, no dejes espacios, usa minusculas y que sea unico"
    }) 
 }
}


