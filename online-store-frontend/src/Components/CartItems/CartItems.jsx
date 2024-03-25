import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

export const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
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
            <div className="cart-items-format cart-items-main-format">
              <img src={e.image} alt="" className="cart-icon-product" />
              <p>{e.name}</p>
              <p>{e.new_price} LEI</p>
              <button className="cart-items-quantity">{cartItems[e.id]}</button>
              <p>{e.new_price * cartItems[e.id]} LEI</p>
              <img
                src={remove_icon}
                onClick={() => removeFromCart(e.id)}
                alt=""
                className="cart-item-remove-icon"
              />
            </div>
          );
        }
        return null;
      })}
      <div className="cart-items-down">
        <div className="cart-items-total">
          <h1>cart Totals</h1>
          <div>
            <div className="cart-items-total-item">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()} LEI</p>
            </div>
            <hr />
            <div className="cart-items-total-item">
              <p>Shipping fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cart-items-total-item">
              <h3>Total</h3>
              <h3>{getTotalCartAmount()} LEI</h3>
            </div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-items-promo-code">
          <p>If you have a promo code, enter it here</p>
          <div className="cart-items-promo-box">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
