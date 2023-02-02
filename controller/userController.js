const User = require("../models/User")

function mountUser(req) {
    const {
        nome,
        foto,
        cpf,
        email,
        senha,
        telefone,
        data_nasc,
        planilha
    } = req.body;

    const user = {
        nome,
        foto,
        cpf,
        email,
        senha,
        telefone,
        data_nasc,
        planilha
    };

    return user;
}

function validUser(user, update = false) {
    let error = 0;

    if (!update)
        if (!user.email) {
            error++;
            
        }

    if (!user.nome) {
        error++;
       
    }

    if (!user.senha) {
        error++;
       
    }

    if (error > 0) {
        throw new Error('Error ao cadastrar ou usuário já cadastrado!');
    }
}

async function verifyUserExist(email) {
    let user = await User.exists({ email: email });
    if (user) {
        throw new Error('Error ao cadastrar ou usuário já cadastrado!');
    }
}
module.exports = {
    verifyUserExist,
    validUser,
    mountUser
}