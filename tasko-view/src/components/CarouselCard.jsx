import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/inicioStyle.css";
import { Link } from "react-router-dom";



const CarouselCard = ({ image, name, profession, rating, id }) => {
  const navigate = useNavigate();

  return (
    <div className="carousel-card">
      <div className="carousel-card-header">
        <div className="profile-info">
          <img src={image} alt={`Foto de ${name}`} className="profile-pic" />
        </div>
        <div className="rating-carousel">
          <span>
            <i className="fas fa-star"></i> {rating}
          </span>
        </div>
      </div>
      <div className="carousel-card-content">
        <h3>{name}</h3>
        <p>{profession}</p>
      </div>
      <div className="carousel-card-button">
        <button onClick={() => navigate(`/perfil-prestador/${id}`)}>
          <FontAwesomeIcon icon={faArrowRight}  />
        </button>
      </div>
    </div>
  );

};

export default CarouselCard;
