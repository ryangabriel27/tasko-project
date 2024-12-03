import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAtlas } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";
import CategoryCard from "../components/CategoryCard";
import CarouselCard from "../components/CarouselCard";
import "../assets/css/inicioStyle.css";
import image1 from "../assets/img/profile1.png";
import image2 from "../assets/img/profile2.png";
import { Helmet } from "react-helmet"; // Importe o Helmet
import Carregando from "../components/Carregando";
import backgroundImage from "../assets/img/servicofundo.svg";
import ServicoCard from "../components/ServicoCard";

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [randomProviders, setRandomProviders] = useState([]); // Estado para armazenar os prestadores
    const [randomServices, setRandomServices] = useState([]); // Estado para armazenar os serviços
    const carouselContentRef = useRef(null); // Ref para acessar o conteúdo do carrossel

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
                const response = await fetch('http://localhost:8080/api/prestadores/random?limite=15', {
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

        const fetchRandomServices = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/servicos/random?limite=6', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const dataServices = await response.json();
                    setRandomServices(dataServices); // Salva os dados no estado
                } else {
                    console.error('Erro ao buscar prestadores:', response.status);
                }
            } catch (error) {
                console.error('Erro na requisição dos prestadores:', error);
            }
        };

        fetchRandomProviders();
    }, []);

    const handleClick = () => {
        // Redireciona para a página de publicações
        navigate('/publicacoes');
    };

    const handleScroll = (direction) => {
        if (carouselContentRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            carouselContentRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    if (!user) {
        return <Carregando />
    }

    if (randomProviders.length === 0) {
        return <Carregando />
    }

    return (
        <>
            <Helmet>
                <title>Início - Tasko</title>
                <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet"></link>
            </Helmet>
            <Navbar />
            <main style={{ marginTop: "20px" }}></main>
            <h1 className="lightBack dashboardMargin">Bem-vindo, {user.nome} {user.sobrenome}!</h1>
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
                            randomProviders.slice(0, 6).map((provider, index) => (
                                <CategoryCard
                                    key={index}
                                    image={provider.usuario.foto || image1} // Use a imagem padrão caso não tenha
                                    name={`${provider.usuario.nome} ${provider.usuario.sobrenome}`}
                                    profession={provider.categoria.nome}
                                    rating={""}
                                    id={provider.id}
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
                        {randomProviders.slice(7, 21).map((item, index) => (
                            <CarouselCard
                                key={index}
                                image={item.usuario.foto || image1} // Use a imagem padrão caso não tenha
                                name={`${item.usuario.nome} ${item.usuario.sobrenome}`}
                                profession={item.categoria.nome}
                                rating={""}
                                id={item.id}
                            />
                        ))}
                    </div>
                    <div className="carousel-nav-buttons">
                        <button
                            className="carousel-nav-btn"
                            onClick={() => handleScroll('left')}
                        >
                            &#10094;
                        </button>
                        <button
                            className="carousel-nav-btn"
                            onClick={() => handleScroll('right')}
                        >
                            &#10095;
                        </button>
                    </div>
                </div>
            </section>
            <section className="grid-services-section">
                {randomServices.slice(0, 6).map((item, index) => {
                    <ServicoCard key={index}
                        image={item.prestador.usuario.foto}
                        name={item.titulo}
                        descricao={item.descricao}
                        categoria={item.prestador.categoria.nome}
                        username={item.prestador.usuario.nome}
                        usersurname={item.prestador.usuario.sobrenome}
                        id={item.prestador.id} />
                })};
            </section>
        </>
    );
};

export default Home;
