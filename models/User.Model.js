// 1. IMPORTACIONES
const mongoose	= require("mongoose")

// 2. SCHEMA
// REQUISITOS PARA CREAR UN USER
const userSchema = mongoose.Schema({
	username: String,
	email: String,
	passwordEncriptado: String,
},
{timestamps:true})// ESTABLECER LA FECHA EN LA CUAL FUE CREADO


// 3. MODELO
// nombre de mi carpeta de BD 👇 
const User = mongoose.model("User", userSchema)

// 4. EXPORTACIÓN
module.exports = User