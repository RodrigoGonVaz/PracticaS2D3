//1. IMPORTACIONES
const express           =require("express")
const router            = express.Router()

const authController    =require("./../controllers/auth.Controller")  
const routeGuard = require("./../middlewares/route-guard")


//CREAR
//Crear Libro VISTA (Para el formulariio)
router.get("/signup", routeGuard.usuarioNoLoggeado ,authController.viewRegister)
//Enviar datros a la BD que vienen del formulario
router.post("/signup", routeGuard.usuarioNoLoggeado , authController.register)





//INICIAR SESION
//A. View FORM
router.get("/login", routeGuard.usuarioNoLoggeado , authController.viewLogin )
//FORM
router.post("/login", routeGuard.usuarioNoLoggeado ,authController.login)

//CERRAR SESION
router.post("/logout",routeGuard.usuarioLoggeado, authController.logout)


//



// 3. Exportaciones
module.exports = router