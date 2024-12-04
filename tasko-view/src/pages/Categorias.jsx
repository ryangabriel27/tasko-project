import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import CarouselCard from "../components/CarouselCard";
import Carregando from "../components/Carregando";
// import "../assets/css/categoriaPrestadoresStyle.css";

const CategoriaPrestadores = () => {
    const { id } = useParams();
    const [prestadores, setPrestadores] = useState([]);
    const [categoria, setCategoria] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchPrestadores = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/prestadores/categoria/${id}`);
                if (response.ok) {
                    const prestadoresData = await response.json();
                    setPrestadores(prestadoresData);
                } else {
                    console.error("Erro ao carregar os prestadores.");
                }
            } catch (error) {
                console.error("Erro na requisição:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPrestadores();
    }, [id]);

    if (loading) {
        return <Carregando/>
    }

    return (
        <>
            <Navbar />
            <main style={{ marginTop: "40px" }}></main>
            <div className="categoria-prestadores">
                <h2>{categoria?.nome || "Prestadores"}</h2>
                <div className="prestadores-lista">
                    {prestadores.length === 0 ? (
                        <p>Nenhum prestador encontrado para esta categoria.</p>
                    ) : (
                        prestadores.map((prestador) => (
                            <CarouselCard
                                key={prestador.id}
                                image={prestador.usuario.foto} // Use a imagem padrão caso não tenha
                                name={`${prestador.usuario.nome} ${prestador.usuario.sobrenome}`}
                                profession={prestador.categoria.nome}
                                rating={""}
                                id={prestador.id}
                            />
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default CategoriaPrestadores;
