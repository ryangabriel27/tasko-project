import React from "react";
import "../assets/css/inicioStyle.css";

const CategoryCard = ({ image, name, profession, rating }) => (
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
      <a href="#" className="arrow">
        <i className="fas fa-arrow-right"></i>
      </a>
    </div>
  </div>
);

export default CategoryCard;
