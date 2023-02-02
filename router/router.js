const router = require("express").Router()
const userRouter = require("../router/userRouter")
const exercicioRouter = require("../router/exercicioRouter")
const planilhaRouter = require("../router/planilhaRouter")
const allRoutes = router.use(userRouter, exercicioRouter, planilhaRouter)

module.exports = allRoutes