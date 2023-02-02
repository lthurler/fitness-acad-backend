const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ExercicioSchema = new Schema ({
    nome: {
        type:String,
        unique:true
        },
    grupomuscular: String,
    series: Number,
    repeticoes: Number
});
const Exercicio = mongoose.model("Exercicio",ExercicioSchema);

module.exports = Exercicio
