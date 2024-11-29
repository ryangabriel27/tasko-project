import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faUser, faArrowRightToBracket, faListAlt, faBars } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/navStyle.css";
import logo from "../assets/img/TaskoWhite.png"; // Importe a imagem do logo corretamente

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false); // Estado para o menu
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:8080/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            navigate('/'); // Redireciona para a página inicial
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Alterna entre aberto e fechado
    };

    return (
        <nav>
            {/* Botão de menu hambúrguer */}
            <button className="hamburger-btn" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
            </button>

            {/* Logo central */}
            <div className="logoNav">
                <img src={logo} alt="Logo Tasko" />
            </div>

            {/* Menu navegável */}
            <div className={`nav-links ${menuOpen ? "open" : ""}`}>

                {/* Div com os links, cada um em sua própria linha */}
                <div className="nav-right">
                    <div className="row">
                        <a href="/inicio">
                            <FontAwesomeIcon icon={faHome} />
                            <span> Home</span>
                        </a>
                    </div>
                    <div className="row">
                        <a href="/meus-servicos">
                            <FontAwesomeIcon icon={faListAlt} />
                            <span>Serviços</span>
                        </a>
                    </div>
                    <div className="row">
                        <a href="/busca">
                            <FontAwesomeIcon icon={faSearch} />
                            <span>Busca</span>
                        </a>
                    </div>
                    <div className="row">
                        <a href="/perfil">
                            <FontAwesomeIcon icon={faUser} />
                            <span>Perfil</span>
                        </a>
                    </div>
                    <div className="row">
                        <a onClick={() => handleLogout()}>
                            <FontAwesomeIcon icon={faArrowRightToBracket} />
                            <span>Sair</span>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
