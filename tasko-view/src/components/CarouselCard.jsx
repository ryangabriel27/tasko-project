import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/inicioStyle.css";
import { Link } from "react-router-dom";

const CarouselCard = ({ image, name, profession, rating, id }) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  return (
    <div 
      className="carousel-card2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
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
        <h3 className={`lightBack ${hover ? "hover-color" : ""}`}>{name}</h3>
        <p className={`lightBack ${hover ? "hover-color" : ""}`}>{profession}</p>
      </div>
      <div className="carousel-card-button">
        <button 
          className={`noBack noBorder red pointer ${hover ? "hover-color" : ""}`} 
          onClick={() => navigate(`/perfil-prestador/${id}`)}
        >
          <FontAwesomeIcon icon={faArrowRight}  />
        </button>
      </div>
    </div>
  );
};

export default CarouselCard;
