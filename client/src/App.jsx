import './App.css';
import { BrowserRouter as Roteador, Routes as Rotas, Route as Rota } from "react-router-dom";
import GestaoImagem from './views/GestaoImagem';
import TelaLogin from './views/TelaLogin';

function App() {
  return (
    <Roteador>
      <Rotas>
        <Rota path='/' element={<GestaoImagem />} />
        <Rota path='/login' element={<TelaLogin />} />
      </Rotas>
    </Roteador>
  );
}

export default App;
