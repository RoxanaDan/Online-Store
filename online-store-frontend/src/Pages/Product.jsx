import React, { useContext } from "react";
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'

export const Product = () => {
  const { all_product } = useContext(ShopContext);
  const productId = useParams();
  return <div>

  </div>;
};

export default Product;
