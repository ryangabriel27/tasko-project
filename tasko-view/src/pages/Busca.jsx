import React, { useState } from "react";
import Navbar from "../components/Navbar";
import categoriaazul from "../assets/img/categoria1.png";
import categoriarosa from "../assets/img/categoriarosa.png";
import categoriaamarelo from "../assets/img/categoriaamarelo.png";
import "../assets/css/buscaStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Busca = () => {
    const [nome, setNome] = useState("");
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();
    const categorias = [
        { id: 1, imagem: categoriaazul, texto: "Tecnologia e Desenvolvimento" },
        { id: 2, imagem: categoriarosa, texto: "Marketing e Venda" },
        { id: 3, imagem: categoriaamarelo, texto: "Design e Criatividade" },
        { id: 4, imagem: categoriarosa, texto: "Escrita e Tradução" },
        { id: 5, imagem: categoriaamarelo, texto: "Consultoria e Estratégia" },
        { id: 6, imagem: categoriaazul, texto: "Administração e Suporte" },
        { id: 7, imagem: categoriaamarelo, texto: "Saúde e Bem-Estar" },
        { id: 8, imagem: categoriaazul, texto: "Educação" },
        { id: 9, imagem: categoriarosa, texto: "Arte, Teatro e Música" },
        { id: 10, imagem: categoriaazul, texto: "Arquitetura e Engenharia" },
        { id: 11, imagem: categoriarosa, texto: "Serviços Domésticos" },
        { id: 12, imagem: categoriaamarelo, texto: "Eventos e Produção" },
        { id: 13, imagem: categoriarosa, texto: "Gestão de Projetos" },
        { id: 14, imagem: categoriaamarelo, texto: "Psicologia e Coaching" },
        { id: 15, imagem: categoriaazul, texto: "Fotografia e Vídeo" },
        { id: 16, imagem: categoriaamarelo, texto: "Comércio e Vendas" },
        { id: 17, imagem: categoriaazul, texto: "Turismo e Lazer" },
        { id: 18, imagem: categoriarosa, texto: "Inovação e Startups" },
        { id: 19, imagem: categoriaazul, texto: "Beleza e Estética" },
        { id: 20, imagem: categoriarosa, texto: "Consultoria Empresarial" },
        { id: 21, imagem: categoriaamarelo, texto: "Redação e Copywriting" },
        { id: 22, imagem: categoriarosa, texto: "Manutenção Geral" },
        { id: 23, imagem: categoriaamarelo, texto: "Finanças e Investimentos" },
        { id: 24, imagem: categoriaazul, texto: "Culinária e Gastronomia" },
    ];

    const handleBuscar = async (e) => {
        e.preventDefault();

        if (nome.trim() === "") return;  // Se não for digitado nada, não faz a busca.

        setCarregando(true);
        try {
            // Navega para a página de resultados e passa os dados via state
            navigate(`/resultados/${nome}`);
        } catch (error) {
            console.error("Erro ao buscar serviços:", error);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <>
            <Navbar />
            <div>
                <section className="categoria-section">
                    <div className="categoria-header">
                        <h2>Categoria</h2>

                        <form onSubmit={handleBuscar} className="busca-box">
                            <button type="submit">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                            <input
                                type="text"
                                placeholder="Buscar serviços..."
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </form>

                    </div>

                    <div className="categorias">
                        {categorias.map((categoria) => (
                            <Link
                                key={categoria.id}
                                to={`/categoria/${categoria.id}`}
                                className="categoria-card"
                            >
                                <div className="categoria-imagem">
                                    <img src={categoria.imagem} alt={categoria.texto} />
                                </div>
                                <div className="categoria-texto">
                                    <h3>{categoria.texto}</h3>
                                </div>
                            </Link>

                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default Busca;
