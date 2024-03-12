import React from "react";
import "./DescriptionBox.css";

export const DescriptionBox = () => {
  return (
    <div className="description-box">
      <div className="description-box-navigator">
        <div className="description-box-nav-box">Description</div>
        <div className="description-box-nav-box fade">Reviews (12)</div>
      </div>
      <div className="description-box-description">
        <p>
          Jachetă din twill moale, cu guler, fermoar în față, mâneci lungi și
          nasturi la manșete. Buzunare mari cu clapă și nasture și un buzunar
          interior paspoalat, cu nasture. Elastic îmbrăcat la tiv. Căptușită.
          Croială standard, pentru confort și o siluetă clasică.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
