import React from "react";
import Navbar from "../components/Navbar";
import "../assets/css/buscaStyle.css";

const Busca = () => {
    const categorias = [
        { id: 2, classe: "card3", icone: "fas fa-book", texto: "Categoria 1" },
        { id: 1, classe: "card1", icone: "fas fa-music", texto: "Categoria 2" },
        { id: 5, classe: "card3", icone: "fas fa-film", texto: "Categoria 3" },
        { id: 4, classe: "card4", icone: "fas fa-book", texto: "Categoria 1" },
        { id: 2, classe: "card5", icone: "fas fa-music", texto: "Categoria 2" },
        { id: 3, classe: "card3", icone: "fas fa-film", texto: "Categoria 3" },
        { id: 1, classe: "card1", icone: "fas fa-book", texto: "Categoria 1" },
        { id: 2, classe: "card2", icone: "fas fa-music", texto: "Categoria 2" },
        { id: 3, classe: "card2", icone: "fas fa-film", texto: "Categoria 3" },
        { id: 5, classe: "card5", icone: "fas fa-book", texto: "Categoria 1" },
        { id: 3, classe: "card1", icone: "fas fa-music", texto: "Categoria 2" },
        { id: 4, classe: "card4", icone: "fas fa-film", texto: "Categoria 3" },
    ];

    return (
        <><Navbar />
            <div>
                {/* Seção de Categorias */}
                <section className="categoria-section">
                    <div className="categoria-header">
                        <h2>Categoria</h2>
                        <div className="busca-box">
                            <input type="text" placeholder="Buscar..." />
                            <button>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>

                    {/* Lista de Categorias */}
                    <div className="categorias">
                        {categorias.map((categoria, index) => (
                            <a
                                key={index}
                                href={`/categoria/${categoria.id}`}
                                className={categoria.classe}
                            >
                                <div className="card-content">
                                    <i className={categoria.icone}></i>
                                    <span className="card-text">{categoria.texto}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </div></>
    );
};

export default Busca;
