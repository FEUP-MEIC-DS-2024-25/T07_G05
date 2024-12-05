const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Conexão com o MongoDB
mongoose.connect("mongodb://localhost:27017/twisterAI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro de conexão:"));
db.once("open", () => console.log("Conectado ao MongoDB!"));

// Definir um modelo de usuário
const UserSchema = new mongoose.Schema({
  _id: String,
  nome: String,
  email: String,
  password: String,
  historico: [String],
});

const User = mongoose.model("User", UserSchema);

// Rotas

// Obter todos os usuários
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Obter um usuário pelo _id
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).send("Usuário não encontrado");
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Criar um novo usuário
app.post("/users", async (req, res) => {
  const data = req.body;

  try {
    const newUser = new User(data);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Atualizar um usuário existente
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    if (!updatedUser) return res.status(404).send("Usuário não encontrado");
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Excluir um usuário
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).send("Usuário não encontrado");
    res.json({ message: "Usuário excluído com sucesso", user: deletedUser });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
