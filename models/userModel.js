const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    token: { type: String },
}, {
    timestamps: true // Cria `createdAt` e `updatedAt`
});

const User = mongoose.model("User", UserSchema);

module.exports = User;