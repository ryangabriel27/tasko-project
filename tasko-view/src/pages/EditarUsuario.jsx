import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Carregando from "../components/Carregando";

const EditarUsuario = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [prestador, setPrestador] = useState(null);
    const [isPrestador, setIsPrestador] = useState(false);
    const [loading, setLoading] = useState(true);

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

    const handleSave = async () => {
        try {
            // Atualizar o usuário
            const userResponse = await fetch(`http://localhost:8080/api/usuarios/${user.id}`, {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (userResponse.ok && isPrestador) {
                // Atualizar o prestador
                const prestadorResponse = await fetch(`http://localhost:8080/api/prestadores/${prestador.id}`, {
                    method: "PUT",
                    credentials: "include",
                    body: JSON.stringify(prestador),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (prestadorResponse.ok) {
                    alert("Informações do prestador e usuário atualizadas com sucesso!");
                    navigate("/configuracoes");
                } else {
                    alert("Erro ao atualizar prestador.");
                }
            } else if (userResponse.ok) {
                alert("Informações do usuário atualizadas com sucesso!");
                navigate("/configuracoes");
            } else {
                alert("Erro ao atualizar informações.");
            }
        } catch (error) {
            console.error("Erro ao salvar dados:", error);
            alert("Erro ao salvar dados. Tente novamente.");
        }
    };

    if (loading) {
        return <Carregando/>
    }

    if (!user) {
        return <p>Erro ao carregar os dados do usuário.</p>;
    }

    return (
        <>
            <Navbar />
            <div className="editar-container">
                <h1>Editar Informações</h1>
                <div className="editar-section">
                    <h2>Informações Básicas</h2>
                    <form>
                        <label>
                            Nome:
                            <input
                                type="text"
                                value={user.nome}
                                onChange={(e) => setUser({ ...user, nome: e.target.value })}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                        </label>
                        <label>
                            Telefone:
                            <input
                                type="text"
                                value={user.telefone}
                                onChange={(e) => setUser({ ...user, telefone: e.target.value })}
                            />
                        </label>
                        <label>
                            Data de Nascimento:
                            <input
                                type="date"
                                value={user.data_nasc}
                                onChange={(e) => setUser({ ...user, data_nasc: e.target.value })}
                            />
                        </label>
                        <label>
                            Endereço:
                            <input
                                type="text"
                                value={user.endereco}
                                onChange={(e) => setUser({ ...user, endereco: e.target.value })}
                            />
                        </label>
                        <label>
                            CEP:
                            <input
                                type="text"
                                value={user.cep}
                                onChange={(e) => setUser({ ...user, cep: e.target.value })}
                            />
                        </label>
                        <label>
                            CPF:
                            <input
                                type="text"
                                value={user.cpf}
                                onChange={(e) => setUser({ ...user, cpf: e.target.value })}
                            />
                        </label>
                        <label>
                            Foto:
                            <input
                                type="url"
                                value={user.foto}
                                onChange={(e) => setUser({ ...user, foto: e.target.value })}
                            />
                        </label>
                    </form>
                </div>

                {isPrestador && prestador && (
                    <div className="editar-section">
                        <h2>Informações do Prestador</h2>
                        <form>
                            <label>
                                Categoria de Serviço:
                                <input
                                    type="text"
                                    value={prestador.categoria.nome}
                                    onChange={(e) => setPrestador({ ...prestador, categoria: { nome: e.target.value } })}
                                />
                            </label>
                            <label>
                                Descrição dos Serviços:
                                <textarea
                                    value={prestador.descricaoServicos}
                                    onChange={(e) => setPrestador({ ...prestador, descricaoServicos: e.target.value })}
                                />
                            </label>
                            <label>
                                Valor por Hora:
                                <input
                                    type="number"
                                    value={prestador.valorHora}
                                    onChange={(e) => setPrestador({ ...prestador, valorHora: e.target.value })}
                                />
                            </label>
                            <label>
                                CNPJ:
                                <input
                                    type="text"
                                    value={prestador.cnpj}
                                    onChange={(e) => setPrestador({ ...prestador, cnpj: e.target.value })}
                                />
                            </label>
                        </form>
                    </div>
                )}

                <div>
                    <button onClick={handleSave}>Salvar</button>
                </div>
            </div>
        </>
    );
};

export default EditarUsuario;
