import { useEffect, useState } from "react";

function Fornecedores() {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [contato, setContato] = useState("");
  const [fornecedores, setFornecedores] = useState([]);

  function carregar() {
    fetch("http://localhost:3000/fornecedores")
      .then(res => res.json())
      .then(data => setFornecedores(data));
  }

  useEffect(() => {
    carregar();
  }, []);

  function salvar(e) {
    e.preventDefault();

    fetch("http://localhost:3000/fornecedores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, cnpj, endereco, contato })
    }).then(() => {
      setNome(""); setCnpj(""); setEndereco(""); setContato("");
      carregar();
    });
  }

  function excluir(id) {
    fetch(`http://localhost:3000/fornecedores/${id}`, { method: "DELETE" })
      .then(() => carregar());
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Fornecedores</h1>

      <form onSubmit={salvar}>
        <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} /><br />
        <input placeholder="CNPJ" value={cnpj} onChange={e => setCnpj(e.target.value)} /><br />
        <input placeholder="Endereço" value={endereco} onChange={e => setEndereco(e.target.value)} /><br />
        <input placeholder="Contato" value={contato} onChange={e => setContato(e.target.value)} /><br /><br />
        <button>Salvar</button>
      </form>

      <hr />

      <ul>
        {fornecedores.map(f => (
          <li key={f.id}>
            {f.nome}
            <button onClick={() => excluir(f.id)}> ❌ Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Fornecedores;
