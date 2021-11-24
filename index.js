// 1. IMPORTACIONES
const express 		= require("express")
const app			= express()

const hbs			= require("hbs")

const connectDB		= require("./config/db")

require("dotenv").config()

// 2. MIDDLEWARES
app.use(express.static("public"))

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

hbs.registerPartials(__dirname + "/views/partials")

//Gestion de datos de los formularios:
app.use(express.urlencoded({extended:true}))

connectDB()

// -------------------------------3. RUTEO----------------------------------------

app.use("/users", require("./routes/users.Routes"))
app.use("/", require("./routes/index.Routes"))



// 4. SERVIDOR
app.listen(process.env.PORT, () => {
	console.log(`Corriendo en el puerto ${process.env.PORT}`)
})