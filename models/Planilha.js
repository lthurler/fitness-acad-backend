const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PlanilhaSchema = new Schema(
    {
        
        nome_funcionario:String,
        serieA:{
            type:[Schema.Types.ObjectId],
            ref:"serieA"
        },
        serieB:{
            type:Array,
        },
        serieC:{
            type:Array
        },
        serieD:{
            type:Array
        },
        serieE:{
            type:Array
        },
        serieF:{
            type:Array
        },
        
    }
)
const Planilha = mongoose.model("Planilha", PlanilhaSchema)
module.exports = Planilha