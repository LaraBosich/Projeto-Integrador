const db = require('../database/db');

exports.criar = (req, res) => {
  const { nome, cnpj, endereco, contato } = req.body;

  db.run(
    `INSERT INTO fornecedores (nome, cnpj, endereco, contato) VALUES (?, ?, ?, ?)`,
    [nome, cnpj, endereco, contato],
    function () {
      res.json({ id: this.lastID });
    }
  );
};

exports.listar = (req, res) => {
  db.all(`SELECT * FROM fornecedores`, [], (err, rows) => {
    res.json(rows);
  });
};
