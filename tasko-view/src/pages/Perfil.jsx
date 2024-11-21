import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import Navbar from "../components/Navbar";
import "../assets/css/perfilStyle.css";
import image from "../assets/img/perfil1.jfif";

const Perfil = () => {
    const [user, setUser] = useState(null);
    const [prestador, setPrestador] = useState(null);
    const [isPrestador, setIsPrestador] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Inicializa o hook useNavigate

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:8080/auth/current", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);

                    if (userData.id) {
                        fetchPrestadorData(userData.id);
                    }
                } else {
                    console.error("Erro ao buscar usuário:", response.status);
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchPrestadorData = async (usuarioId) => {
            try {
                const response = await fetch(`http://localhost:8080/api/prestadores/usuario/${usuarioId}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const prestadorData = await response.json();
                    setPrestador(prestadorData);
                    setIsPrestador(true);
                } else {
                    setPrestador(null);
                    setIsPrestador(false);
                }
            } catch (error) {
                console.error("Erro ao buscar prestador:", error);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (!user) {
        return <p>Erro ao carregar os dados do usuário</p>;
    }

    return (
        <>
            <Navbar />
            <div>
                <div className="profile-section">
                    <div className="profile-info">
                        <img
                            src={user.foto || image}
                            alt="Foto de Perfil"
                            className="profile-pic"
                        />
                        <div className="description">
                            <span className="username">{user.nome}</span>
                            {isPrestador && (
                                <p className="bio">
                                    {prestador.categoriaServicos || "Descrição do serviço não informada"}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="rating">
                        {isPrestador ? (
                            <>
                                <span className="star">&#9733;</span>
                                <span className="rating-value">{user.rating || "N/A"}</span>
                            </>
                        ) : (
                            <span>Bem-vindo ao seu perfil!</span>
                        )}
                    </div>
                    {/* Botão de configuração */}
                    <div className="config-button-wrapper">
                        <button
                            className="config-button"
                            onClick={() => navigate("/configuracoes")} // Redireciona para Configurações
                        >
                            Configurações
                        </button>
                    </div>
                </div>
                {isPrestador && (
                    <>
                        <div className="about-me">
                            <h3 className="about-title">Sobre mim:</h3>
                            <p className="about-text">
                                {prestador.descricaoServicos || "Nenhuma descrição fornecida"}
                            </p>
                        </div>
                        <div className="separator-line"></div>
                        <div className="work-cards">
                            {prestador.trabalhos?.map((trabalho, index) => (
                                <div className="work-card" key={index}>
                                    <div className="work-title">{trabalho.titulo}</div>
                                    <div className="work-value">{trabalho.valor}</div>
                                    <div className="work-arrow">&#10132;</div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Perfil;
