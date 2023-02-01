const mongoose = require("mongoose");

const User = mongoose.model("User", {
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
    perfil: {
        type:Number,
        default:1 //0 = admin, 1 = usuario
    },
    ative: {
        type:Boolean,
        default:true
    }
});

module.exports = User;