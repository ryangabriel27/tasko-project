import React from 'react';
import "../assets/css/fooSimStyle.css";
import logo2 from "../assets/img/TaskoWhite.png"

const FooterSimples = () => { 
    return (
        <footer className="footer2">
                {/* Div Inferior */}
                <div className="footer-bottom2">
                    <div className="footer-left">
                        <img 
                            src={logo2}
                            alt="Logo do Site" 
                            className="footer-image2" 
                        />
                    </div>
                    <div className="footer-right">
                        <ul className="footer-links2">
                            <li><a href="#sobre">Sobre</a></li>
                            <li><a href="#contato">Contato</a></li>
                            <li><a href="#ajuda">Ajuda</a></li>
                        </ul>
                    </div>
                </div>
        </footer>
    );
};

export default FooterSimples;
