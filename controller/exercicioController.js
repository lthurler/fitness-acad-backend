const Exercicio = require("../models/Exercicios")

function mountExercicio(req) {
    const {
        nome,
        grupomuscular,
        series,
        repeticoes
    } = req.body
    const exercicio = {
        nome,
        grupomuscular,
        series,
        repeticoes
    }
    return exercicio
};

module.exports = {
    mountExercicio
}