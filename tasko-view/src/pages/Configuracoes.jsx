import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "../assets/css/configuracoesStyle.css";
import Carregando from "../components/Carregando";
import Modal from "../components/Modal"; // Importe o modal

const Configuracoes = () => {
    const [user, setUser] = useState(null);
    const [prestador, setPrestador] = useState(null);
    const [isPrestador, setIsPrestador] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal
    const navigate = useNavigate();

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

    const handleBecomePrestador = () => {
        setIsModalOpen(true); // Abre o modal
    };

    const handleModalConfirm = () => {
        setIsModalOpen(false); // Fecha o modal
        navigate(`/cad-prest-interno/${user.id}`); // Redireciona para a página de cadastro
    };

    if (loading) {
        return <Carregando />;
    }


    if (!user) {
        return <p>Erro ao carregar os dados do usuário</p>;
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
                        <li className="user-img"><strong>Foto:</strong> {user.foto ? <img src={user.foto} alt="Foto de Perfil" /> : "Nenhuma foto disponível"}</li>
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

                <div className="config-section">
                    <button
                        className="btn-editar"
                        onClick={() => navigate("/editar-usuario")}
                    >
                        Editar Informações
                    </button>
                </div>

                {!isPrestador && !prestador && (
                    <div className="config-section">
                        <button
                            className="btn-prestador"
                            onClick={handleBecomePrestador}
                        >
                            Quero me tornar um prestador
                        </button>
                    </div>
                )}
            </div>

            {/* Modal de confirmação */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleModalConfirm}
                title="Confirmação"
                message="Tem certeza de que deseja se tornar um prestador? Você será redirecionado para o cadastro."
            />
        </>
    );
};

export default Configuracoes;
