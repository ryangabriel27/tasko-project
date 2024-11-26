import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import Navbar from "../components/Navbar";
import "../assets/css/perfilStyle.css";
import image from "../assets/img/perfil1.jfif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Componente de ícone
import { faCog, faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons"; // Ícones específicos

const Perfil = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [rating, setRating] = useState(null);
    const [prestador, setPrestador] = useState(null);
    const [servicos, setServicos] = useState([]);
    const [isPrestador, setIsPrestador] = useState(false); // Indica se o usuário é um prestador
    const [loading, setLoading] = useState(true); // Indica se os dados ainda estão carregando


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
                    fetchServicos(prestadorData.id); // Buscar serviços do prestador
                    sessionStorage.setItem("prestadorId", prestadorData.id); // Salva o ID no sessionStorage
                    fetchRating(prestadorData.id);
                } else {
                    setPrestador(null);
                    setIsPrestador(false);
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
        return <p>Carregando...</p>;
    }

    if (!user) {
        return <p>Erro ao carregar os dados do usuário</p>;
    }

    // Função para editar um serviço
    const handleEdit = (id) => {
        // Navegue para a página de edição do serviço
        navigate(`/editar-servico/${id}`);
    };

    // Função para excluir um serviço
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este serviço?");
        if (confirmDelete) {
            try {
                // Chamada à API para excluir o serviço no backend
                const response = await fetch(`http://localhost:8080/api/servicos/${id}`, {
                    method: "DELETE",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    // Atualiza o estado local para remover o serviço excluído
                    setServicos((prevServicos) =>
                        prevServicos.filter((servico) => servico.id !== id)
                    );
                    alert("Serviço excluído com sucesso!");
                } else {
                    alert("Erro ao excluir o serviço no servidor.");
                }
            } catch (error) {
                console.error("Erro na exclusão do serviço:", error);
                alert("Erro ao excluir o serviço. Tente novamente.");
            }
        }
    };



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
                            <span className="username">
                                {user.nome} {user.sobrenome}
                                <button
                                    className="config-button-large"
                                    onClick={() => navigate("/configuracoes")}
                                >
                                    <FontAwesomeIcon icon={faCog} />
                                </button>
                            </span>
                            {isPrestador && (
                                <p className="bio">
                                    {prestador.categoria.nome || "Descrição do serviço não informada"}
                                </p>
                            )}
                        </div>
                    </div>
                    {isPrestador && (
                        <div className="rating-perfil">
                            <span className="star">&#9733;</span>
                            <p className="rating-value">
                                {rating ? rating.toFixed(1) : "Sem avaliações"}
                            </p>
                        </div>
                    )}
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
                    <div className="services-header">
                        <span className="services-title">Seus serviços</span>
                        <button
                            className="add-service-button"
                            onClick={() => navigate("/adicionar-servico")}
                        >
                            <FontAwesomeIcon icon={faPencilAlt} />
                            <span>Adicionar Serviço</span>
                        </button>
                    </div>


                    <div className="separator-line"></div>
                    <div className="work-section">
                        <div className="work-cards">
                            {servicos.map((servico) => (
                                <div className="work-card" key={servico.id}>
                                    <div className="work-title">{servico.titulo}</div>
                                    <div className="work-value">
                                        R$ {servico.valor.toFixed(2)}
                                    </div>
                                    <div className="work-actions">
                                        <button
                                            className="icon-button edit-button"
                                            onClick={() => handleEdit(servico.id)}
                                        >
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </button>
                                        <button
                                            className="icon-button delete-button"
                                            onClick={() => handleDelete(servico.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </>
            )}
        </>
    );
};

export default Perfil;