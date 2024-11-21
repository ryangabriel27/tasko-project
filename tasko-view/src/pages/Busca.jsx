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
        { id: 3, imagem: categoriarosa, texto: "Serviços Domésticos e Manutenção" },
        { id: 4, imagem: categoriaamarelo, texto: "Eventos e Produção" },
    ];

    return (
        <>
            <Navbar />
            <div>
                <section className="categoria-section">
                    <div className="categoria-header">
                        <h2>Categoria</h2>
                        <div className="busca-box">
                            <input type="text" placeholder="Buscar..." />
                            <button>🔍</button>
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
