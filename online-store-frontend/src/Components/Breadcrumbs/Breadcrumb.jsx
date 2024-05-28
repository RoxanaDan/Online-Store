import React from "react";
import "./Breadcrumb.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";

export const Breadcrumb = (props) => {
  const { product } = props;
  const fromHome = document.referrer.includes("/");

  return (
    <div className="breadcrumb">
      {fromHome ? (
        <>
          HOME
          <img src={arrow_icon} alt="" />
        </>
      ) : null}
      {product.category}
      <img src={arrow_icon} alt="" />
      {product.name}
    </div>
  );
};

export default Breadcrumb;
