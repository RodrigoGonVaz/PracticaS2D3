
const mongoose		= require("mongoose")

const connectDB = async () => {
	await mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,   // FORMATO NUENO DE MONGODB
		useUnifiedTopology: true
	})

	console.log("Base de datos conectada")

}

module.exports = connectDB