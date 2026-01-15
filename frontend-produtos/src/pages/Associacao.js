import { useEffect, useState } from "react";

function Associacao() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [produtoId, setProdutoId] = useState("");
  const [fornecedorId, setFornecedorId] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/produtos").then(r => r.json()).then(setProdutos);
    fetch("http://localhost:3000/fornecedores").then(r => r.json()).then(setFornecedores);
  }, []);

  function associar() {
    fetch("http://localhost:3000/associar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ produto_id: produtoId, fornecedor_id: fornecedorId })
    }).then(() => alert("Associado com sucesso!"));
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Associação Produto / Fornecedor</h1>

      <select onChange={e => setProdutoId(e.target.value)}>
        <option value="">Selecione um produto</option>
        {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
      </select>

      <br /><br />

      <select onChange={e => setFornecedorId(e.target.value)}>
        <option value="">Selecione um fornecedor</option>
        {fornecedores.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
      </select>

      <br /><br />

      <button onClick={associar}>Associar</button>
    </div>
  );
}

export default Associacao;
