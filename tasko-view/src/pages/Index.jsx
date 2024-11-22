import React from "react";
import "../assets/css/style.css";
import img1 from "../assets/img/TaskoPurple.png";
import mu from "../assets/img/Mulher.png"
import lenda from "../assets/img/Animal.png"
import orange from "../assets/img/AnimalLaranja.png"
import Footer from "../components/Footer";
import { Helmet } from "react-helmet"; // Importe o Helmet

const App = () => {
    return (
        <div>
            <Helmet>
                <title>Home - Tasko</title>
            </Helmet>
            {/* Barra superior unificada */}
            <div className="top-bar-container">
                {/* Linha do topo */}
                <div className="top-bar">
                    <span className="top-bar-text">
                        Todos os direitos reservados ao grupo Tasko.
                    </span>
                </div>

                {/* Cabeçalho */}
                <header className="header">
                    <div className="logo">
                        <img
                            src={img1}
                            alt="Logo principal"
                        />
                    </div>
                    <div className="header-buttons">
                        <a href="/cadastro"><button className="button-index">Cadastre-se</button></a>
                        <a href="/auth"><button className="button-index button-index-outline">Entrar</button></a>
                    </div>
                </header>
            </div>

            <section className="hero">
                <div className="hero-text">
                    <h1>
                        Encontre um <span className="highlight">profissional</span>
                    </h1>
                    <p>
                        Busque por prestadores competentes e avaliados em nosso sistema.
                    </p>
                    <a href="/busca"><button className="button-index button-outline">Buscar por categoria</button></a>
                </div>
                <div className="hero-image">
                    <img
                        src={mu}
                        alt="Profissional"
                    />
                </div>
            </section>


            {/* Seção de depoimentos */}
            <section className="testimonial">
                <blockquote>
                    O Tasko é o melhor site para quem quer divulgar seu trabalho.
                </blockquote>
                <div className="testimonial-author">
                    <img src={lenda} alt="Foto do autor" />
                    <div className="testimonial-author-text">
                        <p className="testimonial-author-name">Animal Lendário</p>
                        <p className="testimonial-author-description">Gerado por alguma IA</p>
                    </div>
                </div>
            </section>



            {/* Seção inferior */}
            <section className="cards-section">
                <div className="image-container">
                    {/* Div exclusiva para a imagem */}
                    <img src={orange} alt="Descrição da imagem" />
                </div>
                <div className="cards">
                    {/* Cards */}
                    <div className="card">
                        <h2>Conecte-se a novos clientes e mostre seu talento</h2>
                        <p>
                            A plataforma ideal para trabalhadores autônomos ganharem
                            visibilidade e crescerem profissionalmente.
                        </p>
                        <button className="button-index">Cadastre-se</button>
                    </div>
                    <div className="card">
                        <h2>Busque por prestadores para a categoria que você quiser</h2>
                        <p>
                            Uma plataforma feita para que... ah sei lá, coloca alguma coisa aí.
                        </p>
                        <button className="button-index">Cadastre-se</button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>


       
    );
};

export default App;
