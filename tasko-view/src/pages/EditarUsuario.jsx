import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../assets/css/configuracoesStyle.css";

const EditarUsuario = () => {
    const [user, setUser] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        telefone: "",
        data_nasc: "",
        endereco: "",
        cep: "",
        cpf: "",
        foto: "",
        prestador: null, // Para armazenar os dados do prestador
    });
    const [loading, setLoading] = useState(true); // Carregando estado
    const [error, setError] = useState(""); // Para armazenar erros de API

    // Função para carregar os dados do usuário
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
                } else {
                    setError("Erro ao buscar os dados do usuário");
                }
            } catch (error) {
                setError("Erro na requisição");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Função para lidar com a submissão do formulário de edição
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Formulário enviado:', user);
        
        try {
            const userData = {
                nome: user.nome,
                sobrenome: user.sobrenome,
                email: user.email,
                telefone: user.telefone,
                data_nasc: user.data_nasc,
                endereco: user.endereco,
                cep: user.cep,
                cpf: user.cpf,
                foto: user.foto,
            };
    
            if (user.prestador) {
                userData.prestador = {
                    descricaoServicos: user.prestador.descricaoServicos,
                    links: user.prestador.links,
                    valorHora: user.prestador.valorHora,
                    cnpj: user.prestador.cnpj,
                };
            }
    
            const response = await fetch("http://localhost:8080/auth/update", {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
    
            const data = await response.json();  // Verifique a resposta JSON
            console.log('Resposta da API:', data);
    
            if (response.ok) {
                alert("Informações atualizadas com sucesso!");
            } else {
                setError("Erro ao atualizar os dados");
                console.error("Erro da API:", data);  // Exibe detalhes do erro na API
            }
        } catch (error) {
            setError("Erro na requisição");
            console.error("Erro na requisição:", error);  // Exibe o erro no console
        }
    };
    
    
    

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <Navbar />
            <div className="config-container lightBack">
                <h1>Editar Informações</h1>
                <form onSubmit={handleSubmit} className="form-editar">
                    <div className="form-group">
                        <label htmlFor="nome">Nome:</label>
                        <input
                            type="text"
                            id="nome"
                            value={user.nome}
                            onChange={(e) => setUser({ ...user, nome: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sobrenome">Sobrenome:</label>
                        <input
                            type="text"
                            id="sobrenome"
                            value={user.sobrenome}
                            onChange={(e) => setUser({ ...user, sobrenome: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefone">Telefone:</label>
                        <input
                            type="text"
                            id="telefone"
                            value={user.telefone}
                            onChange={(e) => setUser({ ...user, telefone: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="data_nasc">Data de Nascimento:</label>
                        <input
                            type="date"
                            id="data_nasc"
                            value={user.data_nasc}
                            onChange={(e) => setUser({ ...user, data_nasc: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="endereco">Endereço:</label>
                        <input
                            type="text"
                            id="endereco"
                            value={user.endereco}
                            onChange={(e) => setUser({ ...user, endereco: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cep">CEP:</label>
                        <input
                            type="text"
                            id="cep"
                            value={user.cep}
                            onChange={(e) => setUser({ ...user, cep: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cpf">CPF:</label>
                        <input
                            type="text"
                            id="cpf"
                            value={user.cpf}
                            onChange={(e) => setUser({ ...user, cpf: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="foto">Foto:</label>
                        <input
                            type="text"
                            id="foto"
                            value={user.foto}
                            onChange={(e) => setUser({ ...user, foto: e.target.value })}
                        />
                    </div>

                    {/* Mostrar campos do Prestador, se houver */}
                    {user.prestador && (
                        <>
                            <div className="form-group">
                                <label htmlFor="descricaoServicos">Descrição dos Serviços:</label>
                                <input
                                    type="text"
                                    id="descricaoServicos"
                                    value={user.prestador.descricaoServicos}
                                    onChange={(e) => setUser({
                                        ...user,
                                        prestador: { 
                                            ...user.prestador, 
                                            descricaoServicos: e.target.value 
                                        }
                                    })}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="links">Links (ex: site, portfólio):</label>
                                <input
                                    type="text"
                                    id="links"
                                    value={user.prestador.links}
                                    onChange={(e) => setUser({
                                        ...user,
                                        prestador: { 
                                            ...user.prestador, 
                                            links: e.target.value 
                                        }
                                    })}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="valorHora">Valor por Hora:</label>
                                <input
                                    type="number"
                                    id="valorHora"
                                    value={user.prestador.valorHora}
                                    onChange={(e) => setUser({
                                        ...user,
                                        prestador: { 
                                            ...user.prestador, 
                                            valorHora: e.target.value 
                                        }
                                    })}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="cnpj">CNPJ:</label>
                                <input
                                    type="text"
                                    id="cnpj"
                                    value={user.prestador.cnpj}
                                    onChange={(e) => setUser({
                                        ...user,
                                        prestador: { 
                                            ...user.prestador, 
                                            cnpj: e.target.value 
                                        }
                                    })}
                                />
                            </div>
                        </>
                    )}

                    <div className="form-group">
                        <button type="submit" className="btn-editar">Salvar alterações</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditarUsuario;
