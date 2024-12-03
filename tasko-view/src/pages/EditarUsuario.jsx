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
    const [editType, setEditType] = useState("usuario");
    const [categorias, setCategorias] = useState([]);

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

                    console.log(userData);

                    if (userData) {
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
                    fetchCategorias();
                } else {
                    setPrestador(null);
                    setIsPrestador(false);
                }
            } catch (error) {
                console.error("Erro ao buscar prestador:", error);
            }
        };

        const fetchCategorias = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/categorias");
                const data = await response.json();
                setCategorias(data); // Espera-se que a resposta seja um array de categorias
            } catch (error) {
                console.error("Erro ao buscar categorias:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleSave = async () => {
        try {
            // Atualiza o usuário
            const userResponse = await fetch(`http://localhost:8080/api/users/${user.id}`, {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (userResponse.ok) {
                // Se for prestador, atualiza o prestador também
                if (isPrestador && prestador) {
                    console.log(prestador);
                    const prestadorResponse = await fetch(`http://localhost:8080/api/prestadores/${prestador.id}`, {
                        method: "PUT",
                        credentials: "include",
                        body: JSON.stringify({
                            categoria: {id:prestador.categoriaServicos},
                            usuario: {
                                id: user.id
                            },
                            valorHora: prestador.valorHora,
                            cnpj: prestador.cnpj,
                            descricaoServicos: prestador.descricaoServicos,
                            links: prestador.links
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (prestadorResponse.ok) {
                        alert("Informações do prestador e usuário atualizadas com sucesso!");
                        navigate("/configuracoes");
                    } else {
                        const prestadorError = await prestadorResponse.json();
                        console.error("Erro ao atualizar prestador:", prestadorError);
                        alert(`Erro ao atualizar prestador: ${prestadorError.message || 'Verifique os campos e tente novamente.'}`);
                    }
                } else {
                    alert("Informações do usuário atualizadas com sucesso!");
                    navigate("/configuracoes");
                }
            } else {
                const userError = await userResponse.json();
                console.error("Erro ao atualizar usuário:", userError);
                alert(`Erro ao atualizar informações do usuário: ${userError.message || 'Verifique os campos e tente novamente.'}`);
            }
        } catch (error) {
            console.error("Erro ao salvar dados:", error);
            alert("Erro ao salvar dados. Tente novamente.");
        }
    };


    if (loading) {
        return <Carregando />;
    }

    if (!user) {
        return <p>Erro ao carregar os dados do usuário.</p>;
    }

    return (
        <>
            <Navbar />

            {/* Se tirar isso fode tudo, tmj */}
            <main style={{ marginTop: "60px" }}></main>

            <div></div>
            <div className="editar-container">
                <h1>Editar Informações</h1>

                <div className="button-container">
                    <button onClick={() => setEditType("usuario")}>Editar Informações Básicas</button>
                    {isPrestador && prestador && (
                        <button onClick={() => setEditType("prestador")}>Editar Informações do Prestador</button>
                    )}

                </div>

                {editType === "usuario" && (
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
                                Sobrenome:
                                <input
                                    type="text"
                                    value={user.sobrenome}
                                    onChange={(e) => setUser({ ...user, sobrenome: e.target.value })}
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
                                    disabled
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
                )}

                {editType === "prestador" && isPrestador && prestador && (
                    <div className="editar-section">
                        <h2>Informações do Prestador</h2>
                        <form>
                            <select
                                className="se-class"
                                name="categoriaServicos"
                                required
                                onChange={(e) => setPrestador({...prestador, categoriaServicos: e.target.value})}
                                defaultValue={prestador.categoria.id}
                            >
                                <option value="" disabled>
                                    Categoria dos Serviços
                                </option>
                                {categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.nome}
                                    </option>
                                ))}
                            </select>
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
                                Link Portfólio:
                                <input
                                    type="text"
                                    value={prestador.links}
                                    onChange={(e) => setPrestador({ ...prestador, links: e.target.value })}
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
