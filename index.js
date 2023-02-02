require("dotenv").config()
const express= require("express")
const cors = require("cors")
const app = express()
const router = express.Router()
const allRoutes = require("./router/router")
const auth = require("./service/auth")
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

// router.get("/", auth.checkToken, function (req,res) {
//     console.log("Com acesso")
//     res.status(200).json({message:"Acesso OK!"})
// })
app.use(router)
app.use(allRoutes)

//Port
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Escutando porta ${port}`)
})
