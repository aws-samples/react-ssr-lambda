import React from "react";

const Product = ({ id, name, desc, price }) => {
  return (
    <div id={id}>
      <h1>Product {name}</h1>
      <p>Price ${price}</p>
      <p>Description: {desc}</p>
    </div>
  );
};

export default Product;
