import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const EditarServico = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Pega o ID do serviço da URL
    const [servico, setServico] = useState(null);

    useEffect(() => {
        const fetchServico = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/servicos/${id}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setServico(data);
                } else {
                    alert("Erro ao carregar serviço.");
                }
            } catch (error) {
                console.error("Erro ao buscar serviço:", error);
            }
        };

        fetchServico();
    }, [id]);

    const handleSave = async () => {
        try {
            console.log("Salvando serviço:", servico); // Verifique o que está sendo enviado
    
            const response = await fetch(`http://localhost:8080/api/servicos/${id}`, {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify(servico),
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (response.ok) {
                navigate("/perfil");
                alert("Serviço editado com sucesso!");
            } else {
                alert("Erro ao editar serviço.");
            }
        } catch (error) {
            console.error("Erro ao editar serviço:", error);
            alert("Erro ao editar serviço. Tente novamente.");
        }
    };
    
    

    if (!servico) {
        return <p>Carregando...</p>;
    }

    return (
        <>
            <Navbar />
            <div>
                <h2>Editar Serviço</h2>
                <form>
                    <label>
                        Título:
                        <input
                            type="text"
                            value={servico.titulo}
                            onChange={(e) => setServico({ ...servico, titulo: e.target.value })}
                        />
                    </label>
                    <label>
                        Descrição:
                        <textarea
                            value={servico.descricao}
                            onChange={(e) => setServico({ ...servico, descricao: e.target.value })}
                        />
                    </label>
                    <label>
                        Valor:
                        <input
                            type="number"
                            value={servico.valor}
                            onChange={(e) => setServico({ ...servico, valor: e.target.value })}
                        />
                    </label>
                    <button type="button" onClick={handleSave}>
                        Salvar alterações
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditarServico;
