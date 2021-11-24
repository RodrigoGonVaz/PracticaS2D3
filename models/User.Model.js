// 1. IMPORTACIONES
const mongoose	= require("mongoose")

// 2. SCHEMA
// REQUISITOS PARA CREAR UN USER
const userSchema = mongoose.Schema({
	username: String,
	email: {
        type: String,
        // En caso si ni hay email manda mensaje
        require: [true, "email es requerido"],
		match: [/^\S+@\S+\.\S+$/, "Por favor, ingresa un email válido."], // REGEX DEL EMAIL
		unique: true, // EMAIL ÚNICO EN LA BASE DE DATOS
		lowercase: true, // MINÚSCULAS
		trim: true // SIN ESPACIOS VACÍOS
    },
	passwordEncriptado: String,
},
{timestamps:true})// ESTABLECER LA FECHA EN LA CUAL FUE CREADO


// 3. MODELO
// nombre de mi carpeta de BD 👇 
const User = mongoose.model("User", userSchema)

// 4. EXPORTACIÓN
module.exports = User