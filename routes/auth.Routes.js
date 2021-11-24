//1. IMPORTACIONES
const express           =require("express")
const router            = express.Router()

const authController    =require("./../controllers/auth.Controller")  


//CREAR
//Crear Libro VISTA (Para el formulariio)
router.get("/signup", authController.viewRegister)
//Enviar datros a la BD que vienen del formulario
router.post("/signup", authController.register)


// 3. Exportaciones
module.exports = router