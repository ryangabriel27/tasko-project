import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/navStyle.css";
import logo from "../assets/img/TaskoWhite.png"; // Importe a imagem do logo corretamente

const Header = () => {
    return (
        <nav>
            {/* Navbar esquerda */}
            <div className="nav-left">
                <a href="/inicio">
                    <FontAwesomeIcon icon={faHome} />
                    <span>Home</span>
                </a>
            </div>

            {/* Logo central */}
            <div className="logoNav">
                <img src={logo} alt="Logo Tasko" />
            </div>

            {/* Navbar direita */}
            <div className="nav-right">
                <a href="/busca">
                    <FontAwesomeIcon icon={faSearch} />
                    <span>Busca</span>
                </a>
                <a href="/perfil">
                    <FontAwesomeIcon icon={faUser} />
                    <span>Perfil</span>
                </a>
            </div>
        </nav>
    );
};

export default Header;
