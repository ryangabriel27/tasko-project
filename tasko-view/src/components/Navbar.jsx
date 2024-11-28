import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faUser, faArrowRightToBracket, faList } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/navStyle.css";
import logo from "../assets/img/TaskoWhite.png"; // Importe a imagem do logo corretamente

const Header = () => {
    const navigate = useNavigate();

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
                <a href="/meus-servicos">
                    <FontAwesomeIcon icon={faList} />
                    <span>Meus Serviços</span>
                </a>
                <a href="/busca">
                    <FontAwesomeIcon icon={faSearch} />
                    <span>Busca</span>
                </a>
                <a href="/perfil">
                    <FontAwesomeIcon icon={faUser} />
                    <span>Perfil</span>
                </a>

                <a onClick={() => handleLogout()}>
                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                    <span>Sair</span>
                </a>


            </div>
        </nav>
    );
};

export default Header;
