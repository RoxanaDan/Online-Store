import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product_icon from "../../Assets/Product_Cart.png";
import list_product_icon from "../../Assets/Product_List.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/add-product"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="" />
          <p>Add product</p>
        </div>
      </Link>
      <Link to={"/list-product"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" />
          <p>Product list</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
