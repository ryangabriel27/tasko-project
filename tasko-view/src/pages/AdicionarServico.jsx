import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import taskoWhite from "../assets/img/TaskoWhite.png";
import fundo from "../assets/img/Background1.png";
import FooterSimples from "../components/FooterSimples";
import "../assets/css/addStyle.css";

const AdicionarServico = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        descricao: "",
        categoria: "",
        valor: "",
    });
    const [prestador, setPrestador] = useState(null);
    const prestadorId = sessionStorage.getItem("prestadorId");

    useEffect(() => {
        const fetchPrestadorData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/prestadores/${prestadorId}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const prestadorData = await response.json();
                    setPrestador(prestadorData);
                } else {
                    setPrestador(null);
                    
                }
            } catch (error) {
                console.error("Erro ao buscar prestador:", error);
            }
        };

        fetchPrestadorData();
    }, []);

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
            <nav className="add-navbar">
                <Link
                    to="/perfil"
                    className="add-voltar-link"
                    onClick={() => sessionStorage.removeItem("prestadorId")}
                >
                    ←
                </Link>
                <img src={taskoWhite} alt="tasko" className="add-logo" />
            </nav>

            <div className="add-content">
                {/* Lado esquerdo: imagem com texto */}
                <div className="add-left-side">
                    <img src={fundo} alt="Background" className="add-background-image" />
                    <div className="add-overlay-text">
                        <h1>Adicionar Novo Serviço</h1>
                    </div>
                </div>

                {/* Lado direito: formulário */}
                <div className="add-right-side">
                    <form onSubmit={handleSubmit} className="add-form">
                        <div>
                            <input
                                type="text"
                                name="titulo"
                                placeholder="Título"
                                required
                                className="add-input"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <textarea
                                name="descricao"
                                placeholder="Descrição do Serviço"
                                required
                                className="add-textarea"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="categoria"
                                placeholder="Categoria"
                                required
                                className="add-input"
                                onChange={handleInputChange}
                                disabled
                                value={prestador.categoria.nome}
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                name="valor"
                                placeholder="Valor (R$)"
                                required
                                className="add-input"
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" className="add-button">Adicionar</button>
                    </form>
                </div>
            </div>

            <FooterSimples />
        </div>
    );
};

export default AdicionarServico;
