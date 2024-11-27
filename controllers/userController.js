const User = require("../models/userModel");
const { generateToken, checkPassword, hashPassword } = require("../services/authService");

// Lista todos os usuários
const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

// Busca usuário por ID
const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(user);
};

// Cria um novo usuário
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = generateToken(newUser._id);
        res.status(201).json({ user: newUser, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Atualiza usuário por ID
const updateUser = async (req, res) => {
    try {
        const updatedData = req.body;
        if (updatedData.password) {
            updatedData.password = await hashPassword(updatedData.password);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!updatedUser) return res.status(404).json({ error: "Usuário não encontrado" });

        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Deleta usuário por ID
const deleteUser = async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "Usuário não encontrado" });
    res.status(204).send();
};

// Login do usuário
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

    const isPasswordValid = await checkPassword(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: "Senha inválida" });

    const token = generateToken(user._id);
    res.json({ user, token });
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser };
