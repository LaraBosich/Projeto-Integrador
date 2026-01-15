import { useEffect, useState } from "react";

function Produtos() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [codigoBarras, setCodigoBarras] = useState("");
  const [produtos, setProdutos] = useState([]);

  function carregarProdutos() {
    fetch("http://localhost:3000/produtos")
      .then(res => res.json())
      .then(data => setProdutos(data));
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  function salvarProduto(e) {
    e.preventDefault();

    fetch("http://localhost:3000/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, descricao, preco, codigoBarras })
    }).then(() => {
      setNome("");
      setDescricao("");
      setPreco("");
      setCodigoBarras("");
      carregarProdutos();
    });
  }

  function excluirProduto(id) {
    fetch(`http://localhost:3000/produtos/${id}`, {
      method: "DELETE"
    }).then(() => carregarProdutos());
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Produtos</h1>

      <form onSubmit={salvarProduto}>
        <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} /><br />
        <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} /><br />
        <input placeholder="Preço" value={preco} onChange={e => setPreco(e.target.value)} /><br />
        <input placeholder="Código de barras" value={codigoBarras} onChange={e => setCodigoBarras(e.target.value)} /><br /><br />
        <button>Salvar</button>
      </form>

      <hr />

      <ul>
        {produtos.map(p => (
          <li key={p.id}>
            {p.nome} - R$ {p.preco}
            <button onClick={() => excluirProduto(p.id)}> ❌ Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Produtos;
