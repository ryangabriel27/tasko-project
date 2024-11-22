import React from "react";
import Navbar from "../components/Navbar";
import categoriaazul from "../assets/img/categoria1.png";
import categoriarosa from "../assets/img/categoriarosa.png";
import categoriaamarelo from "../assets/img/categoriaamarelo.png";
import "../assets/css/buscaStyle.css";

const Busca = () => {
    const categorias = [
        { id: 2, imagem: categoriaazul, texto: "Tecnologia e Desenvolvimento" },
        { id: 1, imagem: categoriarosa, texto: "Marketing e Venda" },
        { id: 5, imagem: categoriaamarelo, texto: "Design e Criatividade" },
        { id: 4, imagem: categoriarosa, texto: "Escrita e Tradução" },
        { id: 2, imagem: categoriaamarelo, texto: "Consultoria e Estratégia" },
        { id: 3, imagem: categoriaazul, texto: "Administração e Suporte" },
        { id: 1, imagem: categoriaamarelo, texto: "Saúde e Bem-Estar" },
        { id: 2, imagem: categoriaazul, texto: "Educação" },
        { id: 3, imagem: categoriarosa, texto: "Arte, Teatro e Música" },
        { id: 5, imagem: categoriaazul, texto: "Arquitetura e Engenharia" },
        { id: 3, imagem: categoriarosa, texto: "Serviços Domésticos" },
        { id: 4, imagem: categoriaamarelo, texto: "Eventos e Produção" },
        { id: 6, imagem: categoriarosa, texto: "Gestão de Projetos" },
        { id: 7, imagem: categoriaamarelo, texto: "Psicologia e Coaching" },
        { id: 8, imagem: categoriaazul, texto: "Fotografia e Vídeo" },
        { id: 9, imagem: categoriaamarelo, texto: "Comércio e Vendas" },
        { id: 10, imagem: categoriaazul, texto: "Turismo e Lazer" },
        { id: 11, imagem: categoriarosa, texto: "Inovação e Startups" },
        { id: 12, imagem: categoriaazul, texto: "Beleza e Estética" },
        { id: 13, imagem: categoriarosa, texto: "Consultoria Empresarial" },
        { id: 14, imagem: categoriaamarelo, texto: "Redação e Copywriting" },
        { id: 15, imagem: categoriarosa, texto: "Manutenção Geral" },
        { id: 16, imagem: categoriaamarelo, texto: "Finanças e Investimentos" },
        { id: 17, imagem: categoriaazul, texto: "Culinária e Gastronomia" },
    ];

    return (
        <>
            <Navbar />
            <div>
                <section className="categoria-section">
                    <div className="categoria-header">
                        <h2>Categoria</h2>
                        <div className="busca-box">
                            <button>
                                {/* Ícone de busca com Font Awesome */}
                                <i className="fa fa-search"></i>
                            </button>
                            <input type="text" placeholder="Buscar..." />
                        </div>
                    </div>

                    <div className="categorias">
                        {categorias.map((categoria) => (
                            <a
                                key={categoria.id}
                                href={`/categoria/${categoria.id}`}
                                className="categoria-card"
                            >
                                <div className="categoria-imagem">
                                    <img
                                        src={categoria.imagem}
                                        alt={categoria.texto}
                                    />
                                </div>
                                <div className="categoria-texto">
                                    <h3>{categoria.texto}</h3>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default Busca;
