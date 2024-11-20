import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CadastroPrestador = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        descricaoServicos: "",
        categoriaServicos: "",
        links: "",
        valorHora: "",
        cnpj: "",
    });
    const userId = sessionStorage.getItem("userId"); // Recupera o ID do sessionStorage

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            alert("Erro: Usuário não encontrado.");
            return;
        }
        try {
            const response = await fetch("http://localhost:8080/api/prestadores", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, usuario: { id: userId } }),
            });

            if (response.ok) {
                alert("Cadastro de prestador realizado com sucesso!");
                sessionStorage.removeItem("userId");
                navigate("/auth");
            } else {
                const errorMessage = await response.text();
                alert("Erro ao cadastrar prestador: " + errorMessage);
            }
        } catch (error) {
            alert("Erro de conexão: " + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Cadastro de Prestador</h2>
            <input
                type="text"
                name="descricaoServicos"
                placeholder="Descrição dos Serviços"
                required
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="categoriaServicos"
                placeholder="Categoria dos Serviços"
                required
                onChange={handleInputChange}
            />
            <input
                type="url"
                name="links"
                placeholder="Links de Portfólio"
                required
                onChange={handleInputChange}
            />
            <input
                type="number"
                name="valorHora"
                placeholder="Valor por Hora"
                required
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="cnpj"
                placeholder="CNPJ"
                required
                onChange={handleInputChange}
            />
            <button type="submit">Cadastrar</button>
        </form>
    );
};

export default CadastroPrestador;
