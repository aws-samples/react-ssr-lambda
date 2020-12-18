import React from "react";
import Product from "./Product";

const ProductList = ({ result }) => {
  console.log(result);
  if (result.loading) {
    return <div>loading...</div>;
  } else {
    return (
      <div>
        {result.products.map((product, i) => (
          <Product key={i} {...product} />
        ))}
      </div>
    );
  }
};
export default ProductList;
