const express = require("express");
const connectDatabase = require("./utils/connectDatabase");
const userRoutes = require("./routes/userRoutes");

const app = express();
connectDatabase();

app.use(express.json());
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
