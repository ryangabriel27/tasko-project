import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import "../assets/css/perfilStyle.css";
import image from "../assets/img/perfil1.jfif";

const PerfilPrestador = () => {
    const { prestadorId } = useParams(); // Obtém o ID do prestador da rota
    const navigate = useNavigate();
    const [prestador, setPrestador] = useState(null);
    const [servicos, setServicos] = useState([]);
    const [rating, setRating] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrestadorData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/prestadores/${prestadorId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const prestadorData = await response.json();
                    setPrestador(prestadorData);
                    fetchServicos(prestadorData.id); // Buscar serviços do prestador
                    fetchRating(prestadorData.id); // Buscar avaliação média
                } else {
                    console.error("Erro ao buscar prestador:", response.status);
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchServicos = async (prestadorId) => {
            try {
                const response = await fetch(`http://localhost:8080/api/servicos/prestador/${prestadorId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const servicosData = await response.json();
                    setServicos(servicosData);
                } else {
                    console.error("Erro ao buscar serviços:", response.status);
                }
            } catch (error) {
                console.error("Erro na requisição de serviços:", error);
            }
        };

        const fetchRating = async (prestadorId) => {
            try {
                const response = await fetch(`http://localhost:8080/api/avaliacoes/prestador/${prestadorId}/media`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const media = await response.json();
                    setRating(media);
                } else {
                    console.error("Erro ao buscar avaliação:", response.status);
                }
            } catch (error) {
                console.error("Erro na requisição de avaliação:", error);
            }
        };

        fetchPrestadorData();
    }, [prestadorId]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (!prestador) {
        return <p>Prestador não encontrado.</p>;
    }

    return (
        <>
            <Navbar />
            <div className="profile-section">
                <div className="profile-info">
                    <img
                        src={prestador.usuario.foto || image}
                        alt="Foto de Perfil"
                        className="profile-pic"
                    />
                    <div className="description">
                        <span className="username">
                            {prestador.usuario.nome} {prestador.usuario.sobrenome}
                        </span>
                        <p className="bio">{prestador.categoria.nome}</p>
                    </div>
                </div>
                <div className="rating-perfil">
                    <span className="star">&#9733;</span>
                    <p className="rating-value">
                        {rating ? rating.toFixed(1) : "Sem avaliações"}
                    </p>
                </div>
            </div>
            <div className="about-me">
                <h3 className="about-title">Sobre o Prestador:</h3>
                <p className="about-text">
                    {prestador.descricaoServicos || "Nenhuma descrição fornecida"}
                </p>
            </div>
            <div className="separator-line"></div>
            <div className="work-cards">
                {servicos.length > 0 ? (
                    servicos.map((servico) => (
                        <div className="work-card" key={servico.id}>
                            <div className="work-title">{servico.titulo}</div>
                            <div className="work-value">
                                R$ {servico.valor.toFixed(2)}
                            </div>
                            <div className="work-arrow">
                                <a onClick={() => navigate(`/contratar-servico/${servico.id}`)}>
                                    <FontAwesomeIcon icon={faPen} />
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nenhum serviço disponível.</p>
                )}
            </div>
        </>
    );
};

export default PerfilPrestador;
