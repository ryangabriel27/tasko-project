import React from "react";
import "../assets/css/inicioStyle.css";

const CarouselCard = ({ image, name, profession, rating }) => (
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
      <a href="#">
        <i className="fas fa-arrow-right"></i>
      </a>
    </div>
  </div>
);

export default CarouselCard;
