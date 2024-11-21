import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../assets/css/configuracoesStyle.css";

const Configuracoes = () => {
    const [user, setUser] = useState(null); // Armazena informações do usuário
    const [prestador, setPrestador] = useState(null);
    const [isPrestador, setIsPrestador] = useState(false); // Indica se o usuário é um prestador
    const [loading, setLoading] = useState(true); // Indica se os dados estão carregando

    useEffect(() => {
        // Chamar a API para obter o usuário atual
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

                    // Verificar se existe um prestador associado ao usuário
                    if (userData.id) {
                        fetchPrestadorData(userData.id);
                    }
                } else {
                    console.error("Erro ao buscar usuário:", response.status);
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        };

        // Função para buscar dados do prestador com base no ID do usuário
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
                    setIsPrestador(true); // Se for prestador, define como true
                } else {
                    setPrestador(null);
                    setIsPrestador(false); // Caso contrário, define como cliente
                }
            } catch (error) {
                console.error("Erro ao buscar prestador:", error);
            }
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <p>Carregando configurações...</p>; // Indica carregamento
    }

    if (!user) {
        return <p>Erro ao carregar os dados do usuário</p>; // Exibe erro se os dados não forem carregados
    }

    return (
        <>
            <Navbar />
            <div className="config-container">
                <h1>Configurações</h1>
                {isPrestador ? (
                    <div className="config-section">
                        <h2>Configurações para Prestadores</h2>
                        <ul>
                            <li>
                                <button className="config-button">
                                    Editar informações do serviço
                                </button>
                            </li>
                            <li>
                                <button className="config-button">
                                    Alterar categoria de serviço
                                </button>
                            </li>
                            <li>
                                <button className="config-button">
                                    Gerenciar portfólio de trabalhos
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="config-section">
                        <h2>Configurações para Clientes</h2>
                        <ul>
                            <li>
                                <button className="config-button">
                                    Editar informações pessoais
                                </button>
                            </li>
                            <li>
                                <button className="config-button">
                                    Alterar preferências
                                </button>
                            </li>
                            <li>
                                <button className="config-button">
                                    Histórico de pedidos
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default Configuracoes;
