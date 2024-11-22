import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import taskoWhite from "../assets/img/TaskoWhite.png";

const NavbarMenor = ({ link }) => {
    return (
        <nav className="navbarsimples">
            <Link to={link} className="voltar-link">
                ←
            </Link>
            <img src={taskoWhite} alt="tasko" className="logoNavSimples" />
        </nav>
    );
};

export default NavbarMenor;
