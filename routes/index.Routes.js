//1. IMPORTACIONES
const express           =require("express")

const router            = express.Router()
const indexController   =require("./../controllers/index.Controller")


//2. Rutas de la URL Base
router.get("/", indexController.home)


// 3. Exportaciones
module.exports = router