import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

export const CartItems = () => {
  const { all_product, cartItems, removeFromCart } = useContext(ShopContext);
  return (
    <div className="cart-items">
      <div className="cart-items-main-format">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div className="cart-items-format">
              <img src={e.image} alt="" className="cart-icon-product-icon" />
              <p>{e.name}</p>
              <p>LEI {e.new_price}</p>
              <button className="cart-items-quantity">{cartItems[e.id]}</button>
              <p>LEI {e.new_price * cartItems[e.id]}</p>
              <img
                src={remove_icon}
                onClick={() => removeFromCart(e.id)}
                alt=""
                className="cart-icon-product-icon"
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default CartItems;
