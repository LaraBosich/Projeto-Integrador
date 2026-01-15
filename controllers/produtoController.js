const db = require('../database/db');

exports.criar = (req, res) => {
  const { nome, descricao, preco, codigo_barras } = req.body;

  db.run(
    `INSERT INTO produtos (nome, descricao, preco, codigo_barras) VALUES (?, ?, ?, ?)`,
    [nome, descricao, preco, codigo_barras],
    function () {
      res.json({ id: this.lastID });
    }
  );
};

exports.listar = (req, res) => {
  db.all(`SELECT * FROM produtos`, [], (err, rows) => {
    res.json(rows);
  });
};

exports.deletar = (req, res) => {
  db.run(`DELETE FROM produtos WHERE id = ?`, [req.params.id]);
  res.json({ ok: true });
};
