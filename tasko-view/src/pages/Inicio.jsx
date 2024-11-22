import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Navbar from "../components/Navbar";
import CategoryCard from "../components/CategoryCard";
import CarouselCard from "../components/CarouselCard";
import "../assets/css/inicioStyle.css";
import image1 from "../assets/img/profile1.png";
import image2 from "../assets/img/profile2.png";
import { Helmet } from "react-helmet"; // Importe o Helmet

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [randomProviders, setRandomProviders] = useState([]); // Estado para armazenar os prestadores

    useEffect(() => {
        const verificarAuth = async () => {
            try {
                const response = await fetch('http://localhost:8080/auth/current', {
                    credentials: 'include'
                });

                if (!response.ok) {
                    navigate('/');
                    return;
                }

                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('Erro ao verificar autenticação:', error);
                navigate('/');
            }
        };

        verificarAuth();
    }, [navigate]);

    // Função para buscar prestadores aleatórios
    useEffect(() => {
        const fetchRandomProviders = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/prestadores/random?limite=12', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    setRandomProviders(data); // Salva os dados no estado
                } else {
                    console.error('Erro ao buscar prestadores:', response.status);
                }
            } catch (error) {
                console.error('Erro na requisição dos prestadores:', error);
            }
        };

        fetchRandomProviders();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:8080/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            navigate('/');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    if (!user) {
        return <div>Carregando...</div>;
    }

    return (
        <>
            <Helmet>
                <title>Início - Tasko</title>
                <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet"></link>
            </Helmet>
            <Navbar />
            <h1>Bem - vindo, {user.nome} {user.sobrenome}!</h1>
            <button onClick={handleLogout}>SAIR</button>
            <section className="container-section">
                <div className="inicio-container">
                    <div className="container-header">
                        <div className="title">
                            <i className="fas fa-location-pin"></i>
                            <h2>Limeira, São Paulo</h2>
                            <i className="fas fa-exchange-alt"></i>
                        </div>
                    </div>
                    <div className="card-grid">
                        {randomProviders.length > 0 ? (
                            randomProviders.slice(0,6).map((provider, index) => (
                                <CategoryCard
                                    key={index}
                                    image={provider.usuario.foto || image1} // Use a imagem padrão caso não tenha
                                    name={`${provider.usuario.nome} ${provider.usuario.sobrenome}`}
                                    profession={provider.categoriaServicos}
                                    rating={""}
                                    id= {provider.id}
                                />
                            ))
                        ) : (
                            <p>Carregando prestadores...</p>
                        )}
                    </div>
                </div>
            </section>
            <section className="carousel-section">
                <div className="carousel-container">
                    <div className="carousel-title">
                        <h3>Você também pode gostar de:</h3>
                    </div>
                    <div className="carousel-content" id="carouselContent">
                        {randomProviders.map((item, index) => (
                            <CarouselCard
                                key={index}
                                image={item.usuario.foto || image1} // Use a imagem padrão caso não tenha
                                name={`${item.usuario.nome} ${item.usuario.sobrenome}`}
                                profession={item.categoriaServicos}
                                rating={""}
                                id= {item.id}
                            />
                        ))}
                    </div>
                    <div className="carousel-nav-buttons">
                        <button className="carousel-nav-btn" id="scrollLeft">
                            &#10094;
                        </button>
                        <button className="carousel-nav-btn" id="scrollRight">
                            &#10095;
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
