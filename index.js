require("dotenv").config()
const express= require("express")
const cors = require("cors")
const app = express()
const router = express.Router()
const allRoutes = require("./router/router")
const mongoose = require("mongoose");
//DB
mongoose.set("strictQuery", true)
mongoose.connect(process.env.DB_URI)
.then(() => {
    console.log("Conectado ao DB")
}).catch((err) => {
    console.log(err)
})
//Express Configuraçao
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
//Express Rotas


app.use(router)
app.use(allRoutes)

//Port
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Escutando porta ${port}`)
})
