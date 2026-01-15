import Produtos from "./pages/Produtos";
import Fornecedores from "./pages/Fornecedores";
import Associacao from "./pages/Associacao";
import { useState } from "react";

function App() {
  const [pagina, setPagina] = useState("produtos");

  return (
    <div>
      <button onClick={() => setPagina("produtos")}>Produtos</button>
      <button onClick={() => setPagina("fornecedores")}>Fornecedores</button>
      <button onClick={() => setPagina("associacao")}>Associação</button>

      <hr />

      {pagina === "produtos" && <Produtos />}
      {pagina === "fornecedores" && <Fornecedores />}
      {pagina === "associacao" && <Associacao />}
    </div>
  );
}

export default App;
