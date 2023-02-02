const Exercicio = require("../models/Exercicios");
const Planilha = require("../models/Planilha")

function mountPlanilha(req) {
    const {
        nome_funcionario 
    } = req.body;
    
    const planilha = {
        nome_funcionario
        
    }
    return planilha
};


module.exports = { mountPlanilha }