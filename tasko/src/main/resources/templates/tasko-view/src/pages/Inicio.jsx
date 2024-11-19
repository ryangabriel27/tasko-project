import React from "react";
import Navbar from "../components/Navbar";
import CategoryCard from "../components/CategoryCard";
import CarouselCard from "../components/CarouselCard";
import "../assets/css/inicioStyle.css";

const Home = () => {
    const categories = [
        { image: "img/profile1.png", name: "Ronaldo Cupim", profession: "Designer Gráfico", rating: 4.8 },
        // Adicione mais objetos conforme necessário
    ];

    const carouselItems = [
        { image: "img/profile2.png", name: "Polibe Murici", profession: "Desenvolvedor JAVA", rating: 4.8 },
        // Adicione mais objetos conforme necessário
    ];

    return (
        <>
            <Navbar />
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
