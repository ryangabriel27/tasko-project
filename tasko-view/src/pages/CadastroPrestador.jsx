import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/cadPresStyle.css";
import FooterSimples from "../components/FooterSimples";
import NavbarMenor from "../components/NavbarMenor";
import fundo2 from "../assets/img/Background1.png";

const CadastroPrestador = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    descricaoServicos: "",
    categoriaServicos: 0,
    links: "",
    valorHora: "",
    cnpj: "",
  });
  const [categorias, setCategorias] = useState([]); // Armazena as categorias da API
  const userId = sessionStorage.getItem("userId");

  // Fetch das categorias na API
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/categorias");
        const data = await response.json();
        setCategorias(data); // Espera-se que a resposta seja um array de categorias
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };
    fetchCategorias();
  }, []);

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
        body: JSON.stringify({ ...formData, usuario: { id: userId }, categoria: {id: formData.categoriaServicos}}),
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




  return (
    <div>
      {/* Navbar menor */}
      <NavbarMenor link={"/escolha-objetivo"} />

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
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
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
              name="descricaoServicos"
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
