import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import ServicoCard from "../components/ServicoCard";
import Carregando from "../components/Carregando";
// import "../assets/css/resultStyle.css";

const Resultados = () => {
    const { titulo } = useParams();  // Obtém o state passado pela navegação
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (titulo) {
            // Realiza a requisição POST com o nome da busca no corpo
            fetch('http://localhost:8080/api/servicos/buscar', {
                method: 'POST',  // Definindo o método como POST
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',  // Informando que o corpo da requisição é JSON
                },
                body: JSON.stringify({ titulo: titulo }),  // Enviando o nome da busca como JSON
            })
                .then((response) => response.json())
                .then((data) => {
                    setResultados(data);  // Armazena os resultados retornados pela API
                })
                .catch((error) => {
                    console.error("Erro ao buscar serviços:", error);
                }).finally(() => {
                    setLoading(false)
                });
        }
        if (titulo == "") {
            navigate('/busca');
        }
    }, [titulo]);

    if (loading) {
        return (
            <Carregando />
        );
    }

    return (
        <>
            <Navbar />

            {/* Se tirar isso fode tudo, tmj */}
            <main style={{ marginTop: "60px" }}></main>

            <div></div>
            <div>
                <section className="resultados-section">
                    <h2>Resultados da Busca</h2>

                    {resultados.length === 0 ? (
                        <p>Nenhum serviço encontrado.</p>
                    ) : (
                        <div className="resultados-lista">
                            {resultados.map((servico) => (
                                <ServicoCard key={servico.id}
                                    image={servico.prestador.usuario.foto}
                                    name={servico.titulo}
                                    descricao={servico.descricao}
                                    categoria={servico.prestador.categoria.nome}
                                    username={servico.prestador.usuario.nome}
                                    usersurname={servico.prestador.usuario.sobrenome}
                                    id={servico.prestador.id}
                                />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </>
    );
};

export default Resultados;
