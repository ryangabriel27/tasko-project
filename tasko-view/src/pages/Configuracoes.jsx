import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom"; // Importando useNavigate
import "../assets/css/configuracoesStyle.css";

const Configuracoes = () => {
    const [user, setUser] = useState(null); // Armazena informações do usuário
    const [prestador, setPrestador] = useState(null);
    const [isPrestador, setIsPrestador] = useState(false); // Indica se o usuário é um prestador
    const [loading, setLoading] = useState(true); // Indica se os dados estão carregando
    const navigate = useNavigate(); // Hook para navegação

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
            <div className="config-container lightBack">
                <h1>Configurações</h1>
                <div className="config-section">
                    <h2 className="lightBack w100">Informações Básicas</h2>
                    <ul>
                        <li><strong>Nome:</strong> {user.nome} {user.sobrenome}</li>
                        <li><strong>Email:</strong> {user.email}</li>
                        <li><strong>Telefone:</strong> {user.telefone}</li>
                        <li><strong>Data de Nascimento:</strong> {user.data_nasc}</li>
                        <li><strong>Endereço:</strong> {user.endereco}</li>
                        <li><strong>CEP:</strong> {user.cep}</li>
                        <li><strong>CPF:</strong> {user.cpf}</li>
                        <li><strong>Foto:</strong> {user.foto ? <img src={user.foto} alt="Foto de Perfil" /> : "Nenhuma foto disponível"}</li>
                    </ul>
                </div>

                {isPrestador && prestador && (
                    <div className="config-section">
                        <h2 className="lightBack w100">Informações do Prestador</h2>
                        <ul>
                            <li><strong>Categoria de Serviço:</strong> {prestador.categoria.nome}</li>
                            <li><strong>Descrição dos Serviços:</strong> {prestador.descricaoServicos}</li>
                            <li><strong>Links:</strong> {prestador.links}</li>
                            <li><strong>Valor por Hora:</strong> R$ {prestador.valorHora}</li>
                            <li><strong>CNPJ:</strong> {prestador.cnpj}</li>
                        </ul>
                    </div>
                )}

                {/* Botão para redirecionar à página de edição */}
                <div className="config-section">
                    <button 
                        className="btn-editar" 
                        onClick={() => navigate("/editar-usuario")}>
                        Editar Informações
                    </button>
                </div>
            </div>
        </>
    );
};

export default Configuracoes;
