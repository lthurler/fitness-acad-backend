const router = require("express").Router()
const userRouter = require("../router/userRouter")
const exercicioRouter = require("../router/exercicioRouter")
const allRoutes = router.use(userRouter, exercicioRouter)

module.exports = allRoutes