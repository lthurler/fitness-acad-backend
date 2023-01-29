const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PlanilhaSchema = new Schema(
    {
        serieA:{
            nome:String,
            type:Schema.Types.ObjectId,
            required:true
        },
        serieB:{
            nome:String,
            type:Schema.Types.ObjectId,
        },
        serieC:{
            nome:String,
            type:Schema.Types.ObjectId,
        },
        serieD:{
            nome:String,
            type:Schema.Types.ObjectId,
        },
        serieE:{
            nome:String,
            type:Schema.Types.ObjectId,
        },
        serieF:{
            nome:String,
            type:Schema.Types.ObjectId,
        },
        
    }
)