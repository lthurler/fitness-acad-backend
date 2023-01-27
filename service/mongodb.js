const mongoose = require("mongoose")

async function conn() {

    try {
        mongoose.set("strictQuery", true)

        mongoose.connect(process.env.DB_URI);
        console.log("Conectado ao BD");
    }catch(error) {
        console.log(error)
    }
}
module.exports = conn