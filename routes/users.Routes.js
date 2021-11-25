// ./routes/users.js
//1. IMPORTACION
const express		= require("express")
const router		= express.Router()

const usersController	= require("./../controllers/users.Controller")

const routeGuard = require("./../middlewares/route-guard")
console.log("El route Guard importado es:", routeGuard.usuarioLoggeado) //<--[Function: usuarioLoggeado]

//2. RUTEO
//Tan pronto el routeGuard.usuarioLoggeado encuentre un next pasa a 👇  la sigueinte funcion
router.get("/profile", routeGuard.usuarioLoggeado ,usersController.profile)




module.exports = router