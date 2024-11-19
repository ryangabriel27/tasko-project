import React from "react";
import Navbar from "../components/Navbar";
import "../assets/css/perfilStyle.css";
import image from "../assets/img/perfil1.jfif";

const Perfil = () => {
    const trabalhos = [
        { titulo: "Desenvolvimento de Sites", valor: "R$ 150,00" },
        { titulo: "Design Gráfico", valor: "R$ 200,00" },
        { titulo: "Consultoria Técnica", valor: "R$ 300,00" },
    ];

    return (
        <><Navbar />
            <div>
                {/* Seção de Perfil */}
                <div className="profile-section">
                    <div className="profile-info">
                        <img
                            src={image}
                            alt="Foto de Perfil"
                            className="profile-pic" />
                        <div className="description">
                            <span className="username">João Silva</span>
                            <p className="bio">
                                Desenvolvedor Web | Apaixonado por tecnologia e inovação
                            </p>
                        </div>
                    </div>
                    <div className="rating">
                        <span className="star">&#9733;</span> {/* Estrela */}
                        <span className="rating-value">4.5</span> {/* Avaliação */}
                    </div>
                </div>

                {/* Seção Sobre Mim */}
                <div className="about-me">
                    <h3 className="about-title">Sobre Mim:</h3>
                    <p className="about-text">
                        Olá, sou o João Silva, um desenvolvedor web apaixonado por tecnologia
                        e inovação. Adoro aprender novas ferramentas e criar soluções que
                        melhorem a vida das pessoas. Com experiência em front-end e back-end,
                        busco sempre evoluir em minha carreira e me conectar com outros
                        profissionais da área. Sou curioso e adoro compartilhar conhecimento!
                    </p>
                </div>

                {/* Linha fina laranja */}
                <div className="separator-line"></div>

                {/* Caixas de Trabalho */}
                <div className="work-cards">
                    {trabalhos.map((trabalho, index) => (
                        <div className="work-card" key={index}>
                            <div className="work-title">{trabalho.titulo}</div>
                            <div className="work-value">{trabalho.valor}</div>
                            <div className="work-arrow">&#10132;</div> {/* Seta */}
                        </div>
                    ))}
                </div>
            </div></>
    );
};

export default Perfil;
