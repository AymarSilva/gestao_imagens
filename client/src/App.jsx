import './App.css';
import { BrowserRouter as Roteador, Routes as Rotas, Route as Rota } from "react-router-dom";
import GestaoImagem from './views/GestaoImagem';

function App() {
  return (
    <Roteador>
      <Rotas>
        <Rota path='/' element={<GestaoImagem />} />
      </Rotas>
    </Roteador>
  );
}

export default App;
