import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import taskoWhite from "../assets/img/TaskoWhite.png";
import fundo from "../assets/img/Background1.png";
import FooterSimples from "../components/FooterSimples";

const AdicionarServico = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        descricao: "",
        categoria: "",
        valor: "",
    });

    const prestadorId = sessionStorage.getItem("prestadorId");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prestadorId) {
            alert("Erro: Prestador não encontrado.");
            return;
        }
        try {
            const response = await fetch("http://localhost:8080/api/servicos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, prestador: { id: prestadorId } }),
            });

            if (response.ok) {
                alert("Serviço adicionado com sucesso!");
                navigate("/perfil");
            } else {
                const errorMessage = await response.text();
                alert("Erro ao adicionar serviço: " + errorMessage);
            }
        } catch (error) {
            alert("Erro de conexão: " + error.message);
        }
    };

    return (
        <div>
            {/* Navbar menor */}
            <nav className="navbar">
                <Link to="/perfil" className="voltar-link" onClick={() => sessionStorage.removeItem("prestadorId")}>
                    ←
                </Link>
                <img src={taskoWhite} alt="tasko" className="logo" />
            </nav>

            <div className="content">
                {/* Lado esquerdo: imagem com texto */}
                <div className="left-side">
                    <img src={fundo} alt="Background" className="background-image" />
                    <div className="overlay-text">
                        <h1>Adicionar Novo Serviço</h1>
                    </div>
                </div>

                {/* Lado direito: formulário */}
                <div className="right-side">
                    <form onSubmit={handleSubmit} className="form">
                        <h2>Adicionar Serviço</h2>
                        <div>
                            <textarea
                                name="descricao"
                                placeholder="Descrição do Serviço"
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="categoria"
                                placeholder="Categoria"
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                name="valor"
                                placeholder="Valor (R$)"
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit">Adicionar</button>
                    </form>
                </div>
            </div>

            <FooterSimples />
        </div>
    );
};

export default AdicionarServico;
