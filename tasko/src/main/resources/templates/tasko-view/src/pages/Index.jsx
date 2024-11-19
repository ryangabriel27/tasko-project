import React from "react";
import "../assets/css/style.css";
import img1 from "../assets/img/TaskoPurple.png";
import mu from "../assets/img/Mulher.png"

const App = () => {
    return (
        <div>
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
                        <a href="/cadastro"><button className="button">Cadastre-se</button></a>
                        <a href="/login"><button className="button button-outline">Entrar</button></a>
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
                    <a href="/busca"><button className="button">Buscar por categoria</button></a>
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
                    “O Tasko é o melhor site para quem quer divulgar seu trabalho.”
                </blockquote>
                <p className="testimonial-author">Animal Lendário</p>
            </section>

            {/* Seção inferior */}
            <section className="cards-section">
                <div className="card">
                    <h2>Conecte-se a novos clientes e mostre seu talento</h2>
                    <p>
                        A plataforma ideal para trabalhadores autônomos ganharem
                        visibilidade e crescerem profissionalmente.
                    </p>
                    <button className="button">Cadastre-se</button>
                </div>
                <div className="card">
                    <h2>Busque por prestadores para a categoria que você quiser</h2>
                    <p>
                        Uma plataforma feita para que... ah sei lá, coloca alguma coisa aí.
                    </p>
                    <button className="button">Cadastre-se</button>
                </div>
            </section>
        </div>
    );
};

export default App;
