import React from "react";
import Navbar from "../components/Navbar";
import "../assets/css/buscaStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faLaptopCode, 
    faBullhorn, 
    faPaintBrush, 
    faPen, 
    faClipboard, 
    faClipboardList, 
    faHeart, 
    faChalkboardTeacher, 
    faTheaterMasks, 
    faBuilding, 
    faWrench, 
    faCalendarAlt,
    faSearch 
} from "@fortawesome/free-solid-svg-icons";

const Busca = () => {
    const categorias = [
        { id: 2, classe: "card3", icone: faLaptopCode, texto: "Tecnologia e Desenvolvimento" },
        { id: 1, classe: "card1", icone: faBullhorn, texto: "Marketing e Venda" },
        { id: 5, classe: "card3", icone: faPaintBrush, texto: "Design e Criatividade" },
        { id: 4, classe: "card4", icone: faPen, texto: "Escrita e Tradução" },
        { id: 2, classe: "card5", icone: faClipboard, texto: "Consultoria e Estratégia" },
        { id: 3, classe: "card3", icone: faClipboardList, texto: "Administração e Suporte" },
        { id: 1, classe: "card1", icone: faHeart, texto: "Saúde e Bem-Estar" },
        { id: 2, classe: "card2", icone: faChalkboardTeacher, texto: "Educação" },
        { id: 3, classe: "card2", icone: faTheaterMasks, texto: "Arte, Teatro e Música" },
        { id: 5, classe: "card5", icone: faBuilding, texto: "Arquitetura e Engenharia" },
        { id: 3, classe: "card1", icone: faWrench, texto: "Serviços Domésticos e Manutenção" },
        { id: 4, classe: "card4", icone: faCalendarAlt, texto: "Eventos e Produção" },
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
                                    <FontAwesomeIcon 
                                        icon={categoria.icone} 
                                        style={{ fontSize: "35px", color: "#fff" }}  // Aplicando o estilo diretamente no ícone
                                    />
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
