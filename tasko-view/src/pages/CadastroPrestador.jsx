import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/cadPresStyle.css";
import FooterSimples from "../components/FooterSimples";
import NavbarMenor from "../components/NavbarMenor";
import fundo2 from "../assets/img/Background1.png";

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
    { value: "Tecnologia e Desenvolvimento", titulo: "Tecnologia e Desenvolvimento" },
    { value: "Saude e Bem Estar", titulo: "Saúde e Bem-Estar" },
    { value: "Arquitetura e Engenharia", titulo: "Arquitetura e Engenharia" },
    { value: "Gestao e Projetos", titulo: "Gestão de Projetos" },
    { value: "Comercio e Vendas", titulo: "Comércio e Vendas" },
    { value: "Beleza e Estetica", titulo: "Beleza e Estética" },
    { value: "Marketing e Vendas", titulo: "Marketing e Vendas" },
    { value: "Consultoria e Estrategia", titulo: "Consultoria e Estratégia" },
    { value: "Educacao", titulo: "Educação" },
    { value: "Servicos Domesticos", titulo: "Serviços Domésticos" },
    { value: "Psicologia e Coaching", titulo: "Psicologia e Coaching" },
    { value: "Turismo e Lazer", titulo: "Turismo e Lazer" },
    { value: "Consultoria Empresarial", titulo: "Consultoria Empresarial" },
    { value: "Design e Criatividade", titulo: "Design e Criatividade" },
    { value: "Administracao e Suporte", titulo: "Administração e Suporte" },
    { value: "Arte e Teatro e Musica", titulo: "Arte, Teatro e Música" },
    { value: "Eventos e Producao", titulo: "Eventos e Produção" },
    { value: "Fotografia e Video", titulo: "Fotografia e Vídeo" },
    { value: "Inovacao e Startups", titulo: "Inovação e Startups" },
    { value: "Redacao e Copywriting", titulo: "Redação e Copywriting" },
    { value: "Mnutencao Geral", titulo: "Manutenção Geral" },
    { value: "Financas e Investimentos", titulo: "Finanças e Investimentos" },
    { value: "Culinaria e Gastronomia", titulo: "Culinária e Gastronomia" },
  ];


  return (
    <div>
      {/* Navbar menor */}
      <NavbarMenor link={"/escolha-objetivo"}/>

      <div className="content">
        {/* Lado esquerdo: imagem com texto */}
        <div className="left-side">
          <img src={fundo2} alt="Background" className="background-image" />
          <div className="overlay-text">
            <h1 class="darkBack w900">Cadastro de <span className="high-text">Prestador</span></h1>
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
