const router = require("express").Router()
const Planilha = require("../models/Planilha")
const planilhaController = require("../controller/planilhaController")
const Exercicio = require("../models/Exercicios")
const exercicioController = require("../controller/exercicioController")


router.post("/planilha/add", async (req, res) => {
    try {
        const planilha = planilhaController.mountPlanilha(req)
        await Planilha.create(planilha)
        res.status(200).json({ msg: "Planilha criada com sucesso" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Erro na rota PlanilhaAdd" })
    }

})
router.post("/planilha/:id", async (req, res) => {
    const exercicio = exercicioController.mountExercicio(req)
    const checkexercicio = await Exercicio.exists({ nome: exercicio.nome });
    if (checkexercicio) {
        console.log("Exercicio já existe!")
        Planilha.findByIdAndUpdate({ _id: req.params.id }, { serieA: Exercicio._id }, { new: true })
            .then(function (Planilha) { res.json(Planilha) })
        return
    }
    await Exercicio.create(req.body)
        .then(function (Exercicio) {
            Planilha.findByIdAndUpdate({ _id: req.params.id }, { serieA: Exercicio._id }, { new: true })
        })
        .then(function (Planilha) {
            res.json(Planilha)
        })
        .catch(err => {
            console.log(err)
            res.json(err);
        })
})
router.post("/planilha/addseries/:id", async (req, res) => {
    try {
        const exercicios = req.body.exercicios
        const listaexercicios = Exercicio.find()
        exercicios.forEach(async (e) => {
            const repetido = await Planilha.findOne({ _id: req.params.id })
            // console.log("Nome Exercicio:\n" + e.nome, "\n Nome Planilha:\n " + repetido.serieA[0].nome)


        })

        // })
    } catch (e) {
        console.log(e.message)
    }
})

module.exports = router