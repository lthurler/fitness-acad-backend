const router = require("express").Router()
const auth = require("../service/auth")
const Exercicio = require("../models/Exercicios")
const exercicioController = require("../controller/exercicioController")

router.post("/exercicio/add", async function (req, res) {
    try {
        const exercicio = exercicioController.mountExercicio(req)
        const checkExercicio = await Exercicio.exists({nome:exercicio.nome})
        if(checkExercicio) {
            return console.log("Esse Exercicio já existe!")
        }
        Exercicio.create(exercicio)
        res.status(200).json({msg: "Exercicio criado com sucesso"})
    }catch(err) {
        console.log(err)
        res.status(500).json({error: "Erro no exercicioRouter"})
    }
});
router.get("/exercises/list", async function (req, res) {
    try {
        await auth.checkToken(req,res)
        let exercicios = await Exercicio.find()
        console.log(exercicios)
        res.status(200).json(exercicios)
    }catch(err) {
        console.log("Erro no catch exercises list")
        console.log(err.message)
        res.status(502).json({msg:"Erro ao buscar exercicios!"})
    }
})
module.exports = router