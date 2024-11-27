const jwt = require("jsonwebtoken");
const secret = "segredoaleatorio";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: "Token não informado" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2) {
        return res.status(401).send({ message: "Token inválido" });
    }

    const [schema, token] = parts;
    if (!/^Bearer$/i.test(schema)) {
        return res.status(401).send({ message: "Token mal formatado" });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Token inválido" });
        }
        req.userId = decoded.id; // Decodifica o ID do usuário
        next(); // Permite prosseguir
    });
};

module.exports = authMiddleware;
