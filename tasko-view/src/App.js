import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Perfil from "./pages/Perfil";
import Busca from "./pages/Busca";
import Inicio from "./pages/Inicio";
import Cadastro from "./pages/Cadastro";
import Index from "./pages/Index"
import AuthPage from "./pages/Auth";
import EscolhaObjetivo from "./pages/EscolhaObjetivo";
import CadastroPrestador from "./pages/CadastroPrestador";
import Configuracoes from "./pages/Configuracoes";
import AdicionarServico from "./pages/AdicionarServico";
import PerfilPrestador from "./pages/PerfilPrestador";
import ContratarServico from "./pages/ContratarServico";
import Pagamento from "./pages/Pagamento";
import GerenciarMeusServicos from "./pages/GerenciarServicos";
import MeusServicosContratados from "./pages/MeusServicos";
import CategoriaPrestadores from "./pages/Categorias";
import EditarServico from "./pages/EditarServico";
import EditarUsuario from "./pages/EditarUsuario"; 
import Resultados from "./pages/Resultado";
import CadPrestadorInterno from "./pages/CadPrestadorInterno";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/busca" element={<Busca />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/escolha-objetivo" element={<EscolhaObjetivo />} />
        <Route path="/cadastro-prestador" element={<CadastroPrestador />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/adicionar-servico" element={<AdicionarServico />} />
        <Route path="/perfil-prestador/:prestadorId" element={<PerfilPrestador />} />
        <Route path="/contratar-servico/:id" element={<ContratarServico />} />
        <Route path="/pagamento/:id" element={<Pagamento />} />
        <Route path="/dashboard" element={<GerenciarMeusServicos />} />
        <Route path="/meus-servicos" element={<MeusServicosContratados />} />
        <Route path="/categoria/:id" element={<CategoriaPrestadores />} />
        <Route path="/editar-servico/:id" element={<EditarServico />} />
        <Route path="/editar-usuario" element={<EditarUsuario />} />
        <Route path="/resultados/:titulo" element={<Resultados />} />
        <Route path="/cad-prest-interno/:userId" element={<CadPrestadorInterno />} />
      </Routes>
    </Router>
  );
}

export default App;
