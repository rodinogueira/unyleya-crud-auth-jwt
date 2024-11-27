const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.DATABASE_URL;

const connectDatabase = async () => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Banco de dados conectado com sucesso!");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
    }
};

module.exports = connectDatabase;
