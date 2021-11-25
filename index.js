// ./index.js

// 1. IMPORTACIONES
const express		= require("express")
const app			= express()

const hbs			= require("hbs")
const sessionManager =require("./config/session")

const connectDB		= require("./config/db")

require("dotenv").config()


// 2. MIDDLEWARES
sessionManager(app) //se invoca el sessionManager y se le integra express

app.use(express.static("public"))

app.set("views", __dirname + "/views")
app.set("view engine", "hbs")

hbs.registerPartials(__dirname + "/views/partials")

app.use(express.urlencoded({ extended: true }))


connectDB()

// 3. RUTAS
//LAYOUT MIDDLEWARE
app.use((req,res,next) =>{
	res.locals.currentUser = req.session.currentUser
	next()
})


app.use("/auth", require("./routes/auth.Routes"))
app.use("/users", require("./routes/users.Routes"))
app.use("/", require("./routes/index.Routes"))

// 4. SERVIDOR
app.listen(process.env.PORT, () => {
	console.log(`Corriendo en el puerto: ${process.env.PORT}`)
})