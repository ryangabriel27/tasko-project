import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/choiceStyle.css";
import fundo3 from "../assets/img/Back3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Componente de ícone
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"; // Ícone específico


const EscolhaObjetivo = () => {
    const navigate = useNavigate();
    const userId = sessionStorage.getItem("userId"); // Recupera o ID do sessionStorage

    const handleChoice = (escolha) => {
        if (!userId) {
            alert("Erro: Usuário não encontrado.");
            navigate("/cadastro");
            return;
        }

        if (escolha === "prestador") {
            navigate("/cadastro-prestador");
        } else {
            alert(`Usuário ID ${userId}: Você escolheu ser um usuário comum.`);
            sessionStorage.removeItem("userId");
            navigate("/auth");
        }
    };

    return (
        <div className="background-container">
            {/* Imagem de fundo */}
            <div className="background-image">
                <img src={fundo3} alt="Background" />
            </div>

            {/* Conteúdo sobreposto */}
            <div className="escolha-overlay">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>



                {/* Título */}
                <h1 className="escolha-title">Qual é o seu objetivo na Tasko?</h1>

                {/* Botões */}
                <div className="container-button">
                    <a href="#" className="button-choice type--A" onClick={() => handleChoice("usuario")}>
                        <div className="button__line"></div>
                        <div className="button__line"></div>
                        <span className="button__text">Usuário</span>
                        <div className="button__drow1"></div>
                        <div className="button__drow2"></div>
                    </a>
                    <a href="#" className="button-choice type--B" onClick={() => handleChoice("prestador")}>
                        <div className="button__line"></div>
                        <div className="button__line"></div>
                        <span className="button__text">Prestador</span>
                        <div className="button__drow1"></div>
                        <div className="button__drow2"></div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default EscolhaObjetivo;
