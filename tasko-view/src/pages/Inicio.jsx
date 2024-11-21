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

    const categories = [
        { image: image1, name: "Ronaldo Cupim", profession: "Designer Gráfico", rating: 4.8 },
        // Adicione mais objetos conforme necessário
    ];

    const carouselItems = [
        { image: image2, name: "Polibe Murici", profession: "Desenvolvedor JAVA", rating: 4.8 },
        { image: image2, name: "Polibe Murici", profession: "Desenvolvedor JAVA", rating: 4.8 },
        { image: image2, name: "Polibe Murici", profession: "Desenvolvedor JAVA", rating: 4.8 },
        { image: image2, name: "Polibe Murici", profession: "Desenvolvedor JAVA", rating: 4.8 },
        { image: image2, name: "Polibe Murici", profession: "Desenvolvedor JAVA", rating: 4.8 },
        { image: image2, name: "Polibe Murici", profession: "Desenvolvedor JAVA", rating: 4.8 },
        { image: image2, name: "Polibe Murici", profession: "Desenvolvedor JAVA", rating: 4.8 },
        // Adicione mais objetos conforme necessário
    ];

    return (
        <>
            <Helmet>
                <title>
                    Início - Tasko
                </title>
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
                        {categories.map((category, index) => (
                            <CategoryCard key={index} {...category} />
                        ))}
                    </div>
                </div>
            </section>
            <section className="carousel-section">
                <div className="carousel-container">
                    <div className="carousel-title">
                        <h3>Você também pode gostar de:</h3>
                    </div>
                    <div className="carousel-content" id="carouselContent">
                        {carouselItems.map((item, index) => (
                            <CarouselCard key={index} {...item} />
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
