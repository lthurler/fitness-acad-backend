const mongoose = require("mongoose");
const Schema = mongoose.Schema
const UserSchema = new Schema({
    nome: String,
    foto: String,
    cpf: String,
    email: {
        type: String,
        unique: true,
        required:true
    },
    senha: String,
    telefone: String,
    data_nasc: String,
    planilha: {
        type: Schema.Types.ObjectId,
        ref: "Planilha"
    },
    perfil: {
        type:Number,
        default:1 //0 = admin, 1 = usuario
    },
    ative: {
        type:Boolean,
        default:true
    }
});
const User = mongoose.model("User", UserSchema)
module.exports = User;