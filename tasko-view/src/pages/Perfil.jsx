import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../assets/css/perfilStyle.css";
import image from "../assets/img/perfil1.jfif";

const Perfil = () => {
    const [user, setUser] = useState(null); // Armazena informações do usuário
    const [rating, setRating] = useState(null);
    const [prestador, setPrestador] = useState(null);
    const [servicos, setServicos] = useState([]);
    const [isPrestador, setIsPrestador] = useState(false); // Indica se o usuário é um prestador
    const [loading, setLoading] = useState(true); // Indica se os dados ainda estão carregando

    useEffect(() => {
        // Chamar a API para obter o usuário atual
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:8080/auth/current", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                    // Após obter os dados do usuário, verificar se existe um prestador associado
                    if (userData.id) {
                        fetchPrestadorData(userData.id);
                    }
                } else {
                    console.error("Erro ao buscar usuário:", response.status);
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
            } finally {
                setLoading(false); // Conclui o carregamento
            }
        };

        // Função para buscar dados do prestador com base no id do usuário
        const fetchPrestadorData = async (usuarioId) => {
            try {
                const response = await fetch(`http://localhost:8080/api/prestadores/usuario/${usuarioId}`, {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                if (response.ok) {
                    const prestadorData = await response.json();
                    setPrestador(prestadorData);
                    setIsPrestador(true); // Se existir prestador, define como prestador
                    fetchServicos(prestadorData.id); // Buscar serviços do prestador
                    fetchRating(prestadorData.id);
                } else {
                    setPrestador(null);
                    setIsPrestador(false); // Caso contrário, o usuário não é um prestador
                }
            } catch (error) {
                console.error("Erro ao buscar prestador:", error);
            }
        };

        // Função para buscar serviços do prestador
        const fetchServicos = async (prestadorId) => {
            try {
                const response = await fetch(`http://localhost:8080/api/servicos/prestador/${prestadorId}`, {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
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
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                if (response.ok) {
                    const media = await response.json();
                    setRating(media); // O número retornado é diretamente atribuído
                } else {
                    console.error("Erro ao buscar avaliacoes:", response.status);
                }
            } catch (error) {
                console.error("Erro na requisição de avaliacoes:", error);
            }
        };





        fetchUserData();
    }, []);

    if (loading) {
        return <p>Carregando...</p>; // Indica que os dados estão carregando
    }

    if (!user) {
        return <p>Erro ao carregar os dados do usuário</p>; // Mostra erro se os dados não carregarem
    }

    return (
        <>
            <Navbar />
            <div>
                {/* Seção de Perfil */}
                <div className="profile-section">
                    <div className="profile-info">
                        <img
                            src={user.foto || image} // Foto do usuário, se disponível
                            alt="Foto de Perfil"
                            className="profile-pic"
                        />
                        <div className="description">
                            <span className="username">{user.nome} {user.sobrenome}</span>
                            {isPrestador && (
                                <p className="bio">
                                    {prestador.categoriaServicos || "Descrição do serviço não informada"}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="rating-perfil">
                        {isPrestador ? (
                            <>
                                <div className="rating-perfil">
                                    <span className="star">&#9733;</span>
                                    <p className="rating-value">
                                        {rating ? rating.toFixed(1) : "Sem avaliações"} {/* Exibe a média ou mensagem */}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <span>Bem-vindo ao seu perfil!</span>
                        )}
                    </div>

                </div>

                {/* Seção de Trabalhos apenas para prestadores */}
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
                            {servicos.map((servico) => (
                                <div className="work-card" key={servico.id}>
                                    <div className="work-title">{servico.descricao}</div>
                                    <div className="work-value">
                                        R$ {servico.valor.toFixed(2)}
                                    </div>
                                    <div class="work-arrow">&#10132;</div>
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
