const router = require("express").Router()
const Exercicio = require("../models/Exercicios")
const exercicioController = require("../controller/exercicioController")

router.post("/exercicio/add", async function (req, res) {
    try {
        const exercicio = exercicioController.mountExercicio(req)
        Exercicio.create(exercicio)
        res.status(200).json({msg: "Exercicio criado com sucesso"})
    }catch(err) {
        console.log(err)
        res.status(500).json({error: "Erro no exercicioRouter"})
    }
})
router.get("/exercicio/list", async function (req, res) {
    try {
        const exercicios = await Exercicio.find()
        res.status(200).json({message:"Lista de exercicios", exercicios})
    }catch(err) {
        console.log(err)
    }
})

module.exports = router