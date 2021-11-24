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

    //2. Encriptacion de Password  🚩🚩🚩🚩
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
}


