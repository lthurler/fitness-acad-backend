const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ExercicioSchema = new Schema ({
    nome: String,
    grupomuscular: String,
    series: Number,
    repeticoes: Number
});
const Exercicio = mongoose.model("Exercicio",ExercicioSchema);

module.exports = Exercicio
