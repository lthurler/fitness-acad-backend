const router = require('express').Router();
const User = require('../models/User');
const auth = require("../service/auth")
const userController = require("../controller/userController")

router.post("/user/add", async function (req, res) {
    try {
        // Receber e montar o usuário
        const user = userController.mountUser(req);
        // Validar os dados;
        userController.validUser(user);
        // Verifica se usuário já existe
        await userController.verifyUserExist(user.email);
        user.senha = await auth.createPass(user.senha)
        await User.create(user);
        res.status(200).json({ message: "Cadastrado!" });
    } catch (error) {
        res.status(500).json({ error:error.message,msg:"Usuario já cadastrado" });
    }
});

router.get("/user/list", async function (req, res) {
    try {
        await auth.checkToken(req,res)
        let users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error)
        return error;
    }
});

router.get("/usuario/:id", async function (req, res) {
    try {
        let iduser = req.params.id;
        let user = await User.findOne({ _id: iduser });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuario!" });
    }
});

router.patch("/usuario/:id", async function (req, res) {
    try {
        // Receber e montar o usuário
        let iduser = req.params.id;
        const user = userController.mountUser(req);
        // Validar os dados;
        userController.validUser(user, true);
       
        const updateUser = await User.updateOne({ _id: iduser }, user);

        if (updateUser.matchedCount > 0) {
            res.status(200).json({ message: "Atualizado!" });
            return;
        } else {
            throw new Error("Erro ao atualizar!");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/usuario/:id", async function (req, res) {
    try {
        let iduser = req.params.id;
        let user = await User.findOne({ _id: iduser });

        if (!user) {
            throw new Error("Erro ao remover o usuario, usuario não encontrado!");
        }

        let deleteUser = await User.deleteOne({ _id: iduser });
        if (deleteUser.deletedCount > 0) {
            res.status(200).json({ message: "Removido!" });
            return;
        } else {
            throw new Error("Erro ao remover o usuario!");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/user/login", async function (req,res,next) {
try {
    const { email, senha} = req.body
    if(!email || !senha) {
        return res.status(401).json({error:"Usuario não existe"})
    }
    const user = await User.findOne({ email: email, ative: true });
    if(!user) {
        res.status(401).json({error:"Usuario inexistente"})
    }
    await auth.comparePass(senha, user.senha)
    const token = await auth.createToken(res, user)
    return res.status(200).json({message:"Usuário Logado!", token:token,perfil:user.perfil})
}catch(e) {
    console.error(e.message)
    return res.status(500).json({error:"Erro no catch login"});
}
})




module.exports = router;