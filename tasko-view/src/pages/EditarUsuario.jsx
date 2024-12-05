import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Carregando from "../components/Carregando";
import "../assets/css/editUserStyle.css";
import InputField from "react-input-mask";
import { validarCPF, validarEmail, validarTelefone, validarCEP, verificarMaioridade } from "../components/Auth";

const EditarUsuario = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [prestador, setPrestador] = useState(null);
    const [isPrestador, setIsPrestador] = useState(false);
    const [loading, setLoading] = useState(true);
    const [editType, setEditType] = useState("usuario");
    const [categorias, setCategorias] = useState([]);
    const [errors, setErrors] = useState({});

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

    const handleInputChange = async (e) => {
        const { name, value } = e.target;

        // Resetando o erro do campo alterado
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

        if (name === "cep") {
            const cep = value.replace(/\D/g, ""); // Remove caracteres não numéricos
            setUser((prevUser) => ({ ...prevUser, cep }));

            if (cep.length === 8) { // Realiza a busca apenas se o CEP tiver 8 números
                try {
                    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                    const data = await response.json();

                    if (!data.erro) {
                        setUser((prevUser) => ({
                            ...prevUser,
                            endereco: `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`,
                        }));
                    } else {
                        setUser((prevUser) => ({ ...prevUser, endereco: "" })); // Limpa o endereço
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            cep: "CEP não encontrado.",
                        }));
                    }
                } catch (error) {
                    setUser((prevUser) => ({ ...prevUser, endereco: "" })); // Limpa o endereço
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        cep: "Erro ao consultar o CEP.",
                    }));
                }
            } else if (cep.length === 0) {
                // Limpa o campo de endereço quando o CEP for apagado
                setUser((prevUser) => ({ ...prevUser, endereco: "" }));
            }
        } else {
            setUser((prevUser) => ({ ...prevUser, [name]: value }));
        }
    };

    const handleSave = async () => {
        console.log(user);

        // Validação dos campos
        const newErrors = {};
        if (!user.nome.trim()) newErrors.nome = "Nome é obrigatório.";
        if (!user.sobrenome.trim()) newErrors.sobrenome = "Sobrenome é obrigatório.";

        const cpfError = validarCPF(user.cpf);
        if (cpfError) newErrors.cpf = cpfError;

        const telefoneError = validarTelefone(user.telefone);
        if (telefoneError) newErrors.telefone = telefoneError;

        const emailError = validarEmail(user.email);
        if (emailError) newErrors.email = emailError;

        if (!user.senha.trim()) newErrors.senha = "Senha é obrigatória.";

        if (!user.data_nasc) {
            newErrors.data_nasc = "Data de nascimento é obrigatória.";
        } else {
            const maioridadeError = verificarMaioridade(user.data_nasc);
            if (maioridadeError) newErrors.data_nasc = maioridadeError;
        }

        const cepError = validarCEP(user.cep);
        if (cepError) newErrors.cep = cepError;

        if (!user.endereco.trim()) newErrors.endereco = "Endereço é obrigatório.";

        setErrors(newErrors);

        // Se houver erros, não prosseguir com o envio
        if (Object.keys(newErrors).length > 0) return;

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
                            categoria: { id: prestador.categoriaServicos },
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
                    <button onClick={() => setEditType("usuario")} className="btn-basicInfo">Editar Informações Básicas</button>
                    {isPrestador && prestador && (
                        <button onClick={() => setEditType("prestador")} className="btn-prestInfo">Editar Informações do Prestador</button>
                    )}

                </div>

                {editType === "usuario" && (
                    <div className="editar-section">
                        <h2>Informações Básicas</h2>
                        <form className="form-edit-user">
                            <div className="form-group-edit">
                                <label>
                                    Nome:
                                    <input
                                        type="text"
                                        name="nome"
                                        value={user.nome}
                                        onChange={handleInputChange}
                                    />
                                    {errors.nome && <span className="error">{errors.nome}</span>}
                                </label>
                                <label>
                                    Sobrenome:
                                    <input
                                        type="text"
                                        name="sobrenome"
                                        value={user.sobrenome}
                                        onChange={handleInputChange}
                                    />
                                    {errors.sobrenome && <span className="error">{errors.sobrenome}</span>}
                                </label>
                            </div>
                            <div className="form-group-edit">
                                <label>
                                    Email:
                                    <input
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleInputChange}
                                    />
                                    {errors.email && <span className="error">{errors.email}</span>}
                                </label>
                                <label>
                                    Telefone:
                                    <InputField
                                        type="text"
                                        name="telefone"
                                        placeholder="Telefone"
                                        mask="(99) 99999-9999"
                                        value={user.telefone}
                                        onChange={handleInputChange}
                                    />
                                    {errors.telefone && <span className="error">{errors.telefone}</span>}
                                </label>
                            </div>
                            <div className="form-group-edit">
                                <label>
                                    CPF:
                                    <input
                                        type="text"
                                        name="cpf"
                                        value={user.cpf}
                                        onChange={handleInputChange}
                                        disabled
                                    />
                                    {errors.cpf && <span className="error">{errors.cpf}</span>}
                                </label>
                                <label>
                                    Data de Nascimento:
                                    <input
                                        type="date"
                                        name="data_nasc"
                                        value={user.data_nasc}
                                        onChange={handleInputChange}
                                    />
                                    {errors.data_nasc && <span className="error">{errors.data_nasc}</span>}
                                </label>
                            </div>
                            <div className="form-group-edit">
                                <label>
                                    Endereço:
                                    <input
                                        type="text"
                                        name="endereco"
                                        value={user.endereco}
                                        onChange={handleInputChange}
                                        disabled
                                    />
                                    {errors.endereco && <span className="error">{errors.endereco}</span>}
                                </label>
                                <label>
                                    CEP:
                                    <input
                                        type="text"
                                        name="cep"
                                        value={user.cep}
                                        onChange={handleInputChange}
                                    />
                                    {errors.cep && <span className="error">{errors.cep}</span>}
                                </label>
                            </div>
                            <label>
                                Foto:
                                <input
                                    type="url"
                                    name="foto"
                                    value={user.foto}
                                    onChange={handleInputChange}
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
                                onChange={(e) => setPrestador({ ...prestador, categoriaServicos: e.target.value })}
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
                                    disabled
                                />
                            </label>
                        </form>
                    </div>
                )}

                <div>
                    <button onClick={handleSave} className="btn-edit-save">Salvar</button>
                </div>
            </div>
        </>
    );
};

export default EditarUsuario;
