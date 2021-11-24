//1. IMPORTACIONES
const express           =require("express")
const router            = express.Router()

const usersController    =require("./../controllers/users.Controller")  


//CREAR
//Crear Libro VISTA (Para el formulariio)
router.get("/", usersController.register)




// 3. Exportaciones
module.exports = router