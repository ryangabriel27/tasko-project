import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/inicioStyle.css";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/img/servicofundo.svg"; // ajuste o caminho conforme necessário

const ServicoCard = ({ image, username, usersurname, name, categoria, descricao, rating, id }) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  return (
    <div
      className="servico-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="servico-card-header">
        <div className="servico-info">
          <img src={image} alt={`Foto de ${username}`} className="profile-pic" />
          <div className="infoServico">
            <p className={hover ? "hover-color" : ""}>por <strong className={hover ? "hover-color" : ""}>{username} {usersurname}</strong></p>
            <p id="categoriaServico" className={hover ? "hover-color" : ""}>{categoria}</p>
          </div>
        </div>
        <div className="rating-servico">
          <span>
            <i className="fas fa-star"></i> {rating}
          </span>
        </div>
      </div>
      <div className="servico-card-content">
        <h1 className={`lightBack w900 ${hover ? "hover-color" : ""}`}>{name}</h1>
        <p className={`lightBack ${hover ? "hover-color" : ""}`}>{descricao}</p>
      </div>
      <div className="servico-card-button">
        <button className={`noBack noBorder red pointer ${hover ? "hover-color" : ""}`} onClick={() => navigate(`/perfil-prestador/${id}`)}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default ServicoCard;
