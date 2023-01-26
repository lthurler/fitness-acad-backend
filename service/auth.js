const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const auth = {
    
    createPass: async function (oldpass) {
        const salt = await bcrypt.genSalt(11)
        return await bcrypt.hash(oldpass, salt)
    },

    comparePass: async function(pass, passdb) {
        const checkPass = await bcrypt.compare(pass, passdb)
        if(!checkPass){
            throw new Error("Senha Inválida!")
        }
    },
    createToken:  async function(res ,user) {
        try {
            const secret = process.env.SECRET_KEY
            const token = jwt.sign({
                id:user._id,
                nome:user.nome,
                perfil:user.perfil
            }, secret)
            return token
        }catch(e) {
            console.error("Error:", e)
            throw new Error("Erro ao criar token!")
        }
    },
    checkToken: async function(req,res,next) {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(" ")[1];
            if(!token) {
                return res.status(401).json({ error: "Usuário sem acesso!" });
            }
            const secret = process.env.SECRET_KEY
            jwt.verify(token, secret, (err, userInfo) => {
                if(err || userInfo.perfil != 0) {
                    return res.status(401).json({ error: "Usuário sem acesso!" });
                }
                return userInfo;
            })
        }catch(e) {
            return res.status(401).json({ error: "Usuário sem acesso!" + e });
        }
    }


}
module.exports = auth