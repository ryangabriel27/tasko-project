import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Perfil from "./pages/Perfil";
import Busca from "./pages/Busca";
import Inicio from "./pages/Inicio";
import Cadastro from "./pages/Cadastro";
import Index from "./pages/Index"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index/>} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/busca" element={<Busca />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;
