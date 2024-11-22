import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/inicioStyle.css";

const CategoryCard = ({ image, name, profession, rating, id}) => {

  const navigate = useNavigate();

  return (
    <div className="card-inicio">
      <div className="profile-info">
        <img src={image} alt={`Foto de ${name}`} className="profile-pic" />
        <div className="info">
          <h3>{name}</h3>
          <p>{profession}</p>
        </div>
      </div>
      <div className="rating">
        <span>
          <i className="fas fa-star"></i> {rating}
        </span>
        <button class="noBorder noBack orange pointer" onClick={() => navigate(`/perfil-prestador/${id}`)}>
        <FontAwesomeIcon icon={faArrowRight}  />
        </button>
      </div>
    </div>
  );

};

export default CategoryCard;
