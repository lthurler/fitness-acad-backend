const User = require("../models/User")

function mountUser(req) {
    const {
        nome,
        foto,
        cpf,
        email,
        senha,
        telefone,
        data_nasc
    } = req.body;

    const user = {
        nome,
        foto,
        cpf,
        email,
        senha,
        telefone,
        data_nasc
    };

    return user;
}

function validUser(user, update = false) {
    let error = 0;

    if (!update)
        if (!user.email) {
            error++;
            //res.status(422).json({ message: "E-mail obrigatório!" });
            //return
        }

    if (!user.nome) {
        error++;
        //res.status(422).json({ message: "Nome obrigatório!" });
        //return;
    }

    if (!user.senha) {
        error++;
        //res.status(422).json({ message: "Senha obrigatório!" });
        //return;
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