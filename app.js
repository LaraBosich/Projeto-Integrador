const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Banco de dados
const db = new sqlite3.Database("./database.db");

// ================== TABELAS ==================

db.run(`
CREATE TABLE IF NOT EXISTS produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  descricao TEXT,
  preco REAL,
  codigoBarras TEXT
)
`);

db.run(`
CREATE TABLE IF NOT EXISTS fornecedores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  cnpj TEXT,
  endereco TEXT,
  contato TEXT
)
`);

db.run(`
CREATE TABLE IF NOT EXISTS produto_fornecedor (
  produto_id INTEGER,
  fornecedor_id INTEGER
)
`);

// ================== PRODUTOS ==================

app.post("/produtos", (req, res) => {
  const { nome, descricao, preco, codigoBarras } = req.body;

  db.run(
    "INSERT INTO produtos (nome, descricao, preco, codigoBarras) VALUES (?, ?, ?, ?)",
    [nome, descricao, preco, codigoBarras],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});

app.get("/produtos", (req, res) => {
  db.all("SELECT * FROM produtos", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.delete("/produtos/:id", (req, res) => {
  db.run("DELETE FROM produtos WHERE id = ?", [req.params.id]);
  res.sendStatus(200);
});

// ================== FORNECEDORES ==================

app.post("/fornecedores", (req, res) => {
  const { nome, cnpj, endereco, contato } = req.body;

  db.run(
    "INSERT INTO fornecedores (nome, cnpj, endereco, contato) VALUES (?, ?, ?, ?)",
    [nome, cnpj, endereco, contato],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});

app.get("/fornecedores", (req, res) => {
  db.all("SELECT * FROM fornecedores", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.delete("/fornecedores/:id", (req, res) => {
  db.run("DELETE FROM fornecedores WHERE id = ?", [req.params.id]);
  res.sendStatus(200);
});

// ================== ASSOCIAÇÃO ==================

app.post("/associar", (req, res) => {
  const { produto_id, fornecedor_id } = req.body;

  db.run(
    "INSERT INTO produto_fornecedor (produto_id, fornecedor_id) VALUES (?, ?)",
    [produto_id, fornecedor_id],
    function (err) {
      if (err) return res.status(500).json(err);
      res.sendStatus(200);
    }
  );
});

app.get("/fornecedores-do-produto/:id", (req, res) => {
  db.all(
    `
    SELECT f.* FROM fornecedores f
    JOIN produto_fornecedor pf ON pf.fornecedor_id = f.id
    WHERE pf.produto_id = ?
    `,
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

// ================== SERVER ==================

app.listen(3000, () => {
  console.log("Servidor backend rodando em http://localhost:3000");
});
