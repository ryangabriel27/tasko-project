import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/inicioStyle.css";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/img/servicofundo.svg"; // ajuste o caminho conforme necessário

const ServicoCard = ({ image, username, usersurname, name, categoria, descricao, rating, id }) => {
  const navigate = useNavigate();

  return (
    <div className="servico-card">
      <div className="servico-card-header">
        <div className="servico-info">
          <img src={image} alt={`Foto de ${username}`} className="profile-pic" />
          <div className="infoServico">
            <p>por <strong>{username} {usersurname}</strong></p>
            <p id="categoriaServico">{categoria}</p>
          </div>
        </div>
        <div className="rating-servico">
          <span>
            <i className="fas fa-star"></i> {rating}
          </span>
        </div>
      </div>
      <div className="servico-card-content">
        <h1 className="lightBack w900">{name}</h1>
        <p className="lightBack">{descricao}</p>
      </div>
      <div className="servico-card-button">
        <button className="noBack noBorder red pointer" onClick={() => navigate(`/perfil-prestador/${id}`)}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default ServicoCard;
