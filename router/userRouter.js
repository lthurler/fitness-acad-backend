const router = require('express').Router();
const User = require('../models/User');
const auth = require("../service/auth")
const userController = require("../controller/userController")
const Exercicio = require("../models/Exercicios")

router.post("/user/add", async function (req, res) {
    try {
        const user = userController.mountUser(req);
        userController.validUser(user);
        await userController.verifyUserExist(user.email);
        user.senha = await auth.createPass(user.senha)
        await User.create(user);
        res.status(200).json({ message: "Cadastrado!" });
    } catch (error) {
        res.status(500).json({ error:error.message,msg:"Usuario já cadastrado" });
    }
});

router.get("/user/list/", async function (req, res) {
    try {
        await auth.checkToken(req,res)
        let users = await User.find().where('ative').equals(true);
        res.status(200).json(users);
    } catch (error) {
        console.log(error)
        return error;
    }
});

router.get("/user/:email", async function (req, res) {
    try {
        let emailUser = req.params.email;
        await auth.checkToken(req,res)
        let user = await User.findOne({ email: emailUser }).where('ative').equals(true);
        const mountedUser = { nome:user.nome, email:user.email, cpf:user.cpf, telefone:user.telefone,data_nasc:user.data_nasc}
        res.status(200).json(mountedUser);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar usuario!" });
    }
});

router.patch("/user/update", async function (req, res) {
    try {
        // Receber e montar o usuário
        const updateUser = await User.updateOne({ email: req.body.email }, {nome:req.body.nome,email:req.body.email, cpf:req.body.cpf,telefone:req.body.telefone,data_nasc:req.body.data_nasc});

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

router.delete("/user/delete", async function (req, res) {
    try {
        let emailUser = req.body.email;
        let user = await User.findOne({ email: emailUser }).where('ative').equals(true).exec();
        if (!user) {
                throw new Error("Erro ao remover o usuario, usuario não encontrado!");
            }
        await User.findOneAndUpdate({ email: emailUser},{ative:false});
        res.status(200).json({ message: "Removido!" });
      
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
    return res.status(200).json({message:"Usuário Logado!", token:token,perfil:user.perfil,email:user.email})
}catch(e) {
    console.error(e.message)
    return res.status(500).json({error:"Erro no catch login"});
}
});

// router.post("/user/:id", async function (req,res) {
    
//         const exercicio = await Exercicio.create(req.body)
//         .then((Exercicio) => {
//             return User.findOneAndUpdate({ _id: req.params.id }, { exercicio: Exercicio._id }, { new: true });
//         })
//         .then((User) => {
//             res.json(User)
//         })
//         .catch(err => { console.log(err)})
  
// })
// router.get("/usuarioss/:id", async (req,res) => {
//     const user = await User.findOne({ _id: req.params.id })
//     .populate("exercicio")
//     res.json(user)
// })




module.exports = router;