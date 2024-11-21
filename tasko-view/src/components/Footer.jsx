import React from 'react';
import "../assets/css/fooStyle.css";
import logo2 from "../assets/img/TaskoWhite.png"

const Footer = () => { 
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Div Superior */}
                <div className="footer-top">
                    <div className="footer-column">
                        <h3>Sobre Nós</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.</p>
                    </div>
                    <div className="footer-column">
                        <h3>Nossos Serviços</h3>
                        <p>Proin euismod, nisi eget consectetur consectetur, nisl nunc aliquet nisl, quis volutpat arcu nisi.</p>
                    </div>
                    <div className="footer-column">
                        <h3>Novidades</h3>
                        <p>Receba informações atualizadas sobre os nossos projetos e iniciativas mais recentes.</p>
                    </div>
                </div>

                {/* Div Inferior */}
                <div className="footer-bottom">
                    <div className="footer-left">
                        <img 
                            src={logo2}
                            alt="Logo do Site" 
                            className="footer-image" 
                        />
                    </div>
                    <div className="footer-right">
                        <ul className="footer-links">
                            <li><a href="#sobre">Sobre</a></li>
                            <li><a href="#contato">Contato</a></li>
                            <li><a href="#ajuda">Ajuda</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
