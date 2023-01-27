require("dotenv").config()
const express= require("express")
const cors = require("cors")
const app = express()
const router = express.Router()
const conn = require("./service/mongodb")
const allRoutes = require("./router/router")
const auth = require("./service/auth")
//DB
conn()
//Express Rotas
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// router.get("/", auth.checkToken, function (req,res) {
//     console.log("getadooo")
//     res.status(200).json({message:"get funfando"})
// })
app.use(router)
app.use(allRoutes)
//Port
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Escutando porta ${port}`)
})
