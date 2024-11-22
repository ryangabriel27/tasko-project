import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarMenor from "../components/NavbarMenor";

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
            <NavbarMenor link={""}/>
            <div className="escolha-container">
                <h2>Qual é o seu objetivo?</h2>
                <button onClick={() => handleChoice("usuario")}>Usuário Comum</button>
                <button onClick={() => handleChoice("prestador")}>Prestador</button>
            </div></>
    );
};

export default EscolhaObjetivo;
