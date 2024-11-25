import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarMenor from "../components/NavbarMenor";
import "../assets/css/choiceStyle.css";

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
        <>
            <NavbarMenor link={""} />
            <div className="escolha-container">
                <h1 className="escolha-title">Qual é o seu objetivo na Tasko?</h1>

                <div class="container-button">

                    <a href="#" className="button-choice type--A">
                        <div class="button__line"></div>
                        <div class="button__line"></div>
                        <span class="button__text">ENTRY</span>
                        <div class="button__drow1"></div>
                        <div class="button__drow2"></div>
                    </a>
                    <a href="#" class="button-choice type--B">
                        <div class="button__line"></div>
                        <div class="button__line"></div>
                        <span class="button__text">ENTRY</span>
                        <div class="button__drow1"></div>
                        <div class="button__drow2"></div>
                    </a>

                </div>
            </div>
        </>
    );
};

export default EscolhaObjetivo;
