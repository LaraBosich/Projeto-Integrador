const db = require('../database/db');

exports.associar = (req, res) => {
  const { produto_id, fornecedor_id } = req.body;

  db.run(
    `INSERT INTO produto_fornecedor (produto_id, fornecedor_id) VALUES (?, ?)`,
    [produto_id, fornecedor_id]
  );

  res.json({ ok: true });
};

exports.listarPorFornecedor = (req, res) => {
  db.all(`
    SELECT p.*
    FROM produtos p
    JOIN produto_fornecedor pf ON p.id = pf.produto_id
    WHERE pf.fornecedor_id = ?
  `, [req.params.id], (err, rows) => {
    res.json(rows);
  });
};
