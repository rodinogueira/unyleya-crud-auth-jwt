const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET = process.env.SECRET

// Gera token JWT
const generateToken = (userId) => jwt.sign({ id: userId }, SECRET, { expiresIn: "1d" });

// Verifica senha usando bcrypt
const checkPassword = (inputPassword, storedPassword) => bcrypt.compare(inputPassword, storedPassword);

// Criptografa a senha antes de salvar
const hashPassword = (password) => bcrypt.hash(password, 10);

module.exports = { generateToken, checkPassword, hashPassword, SECRET };
