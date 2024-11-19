import React from "react";
import Navbar from "../components/Navbar";
import "../assets/css/buscaStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faMusic, faFilm, faSearch } from "@fortawesome/free-solid-svg-icons";

const Busca = () => {
    const categorias = [
        { id: 2, classe: "card3", icone: faBook, texto: "Tecnologia e Desenvolvimento" },
        { id: 1, classe: "card1", icone: faMusic, texto: "Marketing e Venda" },
        { id: 5, classe: "card3", icone: faFilm, texto: "Design e Criatividade" },
        { id: 4, classe: "card4", icone: faBook, texto: "Escrita e Tradução" },
        { id: 2, classe: "card5", icone: faMusic, texto: "Consultoria e Estratégia" },
        { id: 3, classe: "card3", icone: faFilm, texto: "Administração e Suporte" },
        { id: 1, classe: "card1", icone: faBook, texto: "Saúde e Bem-Estar" },
        { id: 2, classe: "card2", icone: faMusic, texto: "Educação" },
        { id: 3, classe: "card2", icone: faFilm, texto: "Arte, Teatro e Música" },
        { id: 5, classe: "card5", icone: faBook, texto: "Arquitetura e Engenharia" },
        { id: 3, classe: "card1", icone: faMusic, texto: "Serviços Domésticos e Manuntenção" },
        { id: 4, classe: "card4", icone: faFilm, texto: "Eventos e Produção" },
    ];

    return (
        <>
            <Navbar />
            <div>
                {/* Seção de Categorias */}
                <section className="categoria-section">
                    <div className="categoria-header">
                        <h2>Categoria</h2>
                        <div className="busca-box">
                            <input type="text" placeholder="Buscar..." />
                            <button>
                                <FontAwesomeIcon icon={faSearch} />
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
                                    <FontAwesomeIcon icon={categoria.icone} />
                                    <span className="card-text">{categoria.texto}</span>
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
