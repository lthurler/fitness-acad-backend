const router = require("express").Router()
const userRouter = require("../router/userRouter")
const allRoutes = router.use(userRouter)

module.exports = allRoutes