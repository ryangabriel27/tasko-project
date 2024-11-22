import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/cadPresStyle.css";
import taskoWhite from "../assets/img/TaskoWhite.png";
import fundo from "../assets/img/Background1.png";
import FooterSimples from "../components/FooterSimples";

const CadastroPrestador = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    descricaoServicos: "",
    categoriaServicos: "",
    links: "",
    valorHora: "",
    cnpj: "",
  });
  const userId = sessionStorage.getItem("userId");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Erro: Usuário não encontrado.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/api/prestadores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, usuario: { id: userId } }),
      });

      if (response.ok) {
        alert("Cadastro de prestador realizado com sucesso!");
        sessionStorage.removeItem("userId");
        navigate("/auth");
      } else {
        const errorMessage = await response.text();
        alert("Erro ao cadastrar prestador: " + errorMessage);
      }
    } catch (error) {
      alert("Erro de conexão: " + error.message);
    }
  };

  const categorias = [
    { value: "tec-dev", titulo: "Tecnologia e Desenvolvimento" },
    { value: "saude-bem-estar", titulo: "Saúde e Bem-Estar" },
    { value: "arq-eng", titulo: "Arquitetura e Engenharia" },
    { value: "gestao-projetos", titulo: "Gestão de Projetos" },
    { value: "comercio-vendas", titulo: "Comércio e Vendas" },
    { value: "beleza-estetica", titulo: "Beleza e Estética" },
    { value: "marketing-vendas", titulo: "Marketing e Vendas" },
    { value: "consultoria-estrategia", titulo: "Consultoria e Estratégia" },
    { value: "educacao", titulo: "Educação" },
    { value: "servicos-domesticos", titulo: "Serviços Domésticos" },
    { value: "psicologia-coaching", titulo: "Psicologia e Coaching" },
    { value: "turismo-lazer", titulo: "Turismo e Lazer" },
    { value: "consultoria-empresarial", titulo: "Consultoria Empresarial" },
    { value: "design-criatividade", titulo: "Design e Criatividade" },
    { value: "admin-suporte", titulo: "Administração e Suporte" },
    { value: "arte-teatro-musica", titulo: "Arte, Teatro e Música" },
    { value: "eventos-producao", titulo: "Eventos e Produção" },
    { value: "fotografia-video", titulo: "Fotografia e Vídeo" },
    { value: "inovacao-startups", titulo: "Inovação e Startups" },
    { value: "redacao-copywriting", titulo: "Redação e Copywriting" },
    { value: "manutencao-geral", titulo: "Manutenção Geral" },
    { value: "financas-investimentos", titulo: "Finanças e Investimentos" },
    { value: "culinaria-gastronomia", titulo: "Culinária e Gastronomia" },
  ];


  return (
    <div>
      {/* Navbar menor */}
      <nav className="navbarsimples">
        <Link to="/escolha-objetivo" className="voltar-link">
          ←
        </Link>
        <img src={taskoWhite} alt="tasko" className="logoNavSimples" />
      </nav>

      <div className="content">
        {/* Lado esquerdo: imagem com texto */}
        <div className="left-side">
          <img src={fundo} alt="Background" className="background-image" />
          <div className="overlay-text">
            <h1>Cadastro de <span className="high-text">Prestador</span></h1>
          </div>
        </div>

        {/* Lado direito: formulário */}
        <div className="right-side">
          <form onSubmit={handleSubmit} className="form">
            <input className="in-class"
              type="text"
              name="links"
              placeholder="Links de Portfólio"
              required
              onChange={handleInputChange}
            />
            <input className="in-class"
              type="text"
              name="valorHora"
              placeholder="Valor por Hora"
              required
              onChange={handleInputChange}
            />
            <select
              className="se-class"
              name="categoriaServicos"
              required
              onChange={handleInputChange}
              defaultValue=""
            > 
              <option value="" disabled>
                Categoria dos Serviços
              </option>
              {categorias.map((categoria) => (
                <option key={categoria.value} value={categoria.value}>
                  {categoria.titulo}
                </option>
              ))}
            </select>

            <input className="in-class"
              type="text"
              name="cnpj"
              placeholder="CNPJ"
              required
              onChange={handleInputChange}
            />
            <textarea className="text-class"
              placeholder="Descrição dos Serviços"
              required
              onChange={handleInputChange}
            ></textarea>
            <button className="cad-pres" type="submit">Cadastrar</button>
          </form>
        </div>


      </div>
      <FooterSimples></FooterSimples>
    </div>
  );
};

export default CadastroPrestador;
