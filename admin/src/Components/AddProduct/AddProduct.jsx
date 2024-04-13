import React from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  return (
    <div className="add-product">
      <div className="add-product-item-field">
        <p>Product title</p>
        <input type="text" name="name" placeholder="Type here" />
      </div>
      <div className="add-product-price">
        <div className="add-product-item-field">
          <p>Price</p>
          <input type="text" name="old_price" placeholder="Type here" />
        </div>
        <div className="add-product-item-field">
          <p>Offer Price</p>
          <input type="text" name="new_price" placeholder="Type here" />
        </div>
      </div>

      <div className="add-product-item-field">
        <p>Product Category</p>
        <select name="category" className="add-product-selector">
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kids">Kids</option>
        </select>
      </div>
      <div className="add-product-item-field">
        <label htmlFor="file-input">
          <img src={upload_area} className="add-product-thumbnail-img" alt="" />
        </label>
        <input type="file" name="image" id="file-input" hidden />
      </div>
      <button className="add-product-btn">Add image</button>
    </div>
  );
};

export default AddProduct;
