import { useState, useEffect } from "react";

const ProductList = ({ categ }: { categ: string }) => {
  // state hook to add products to an empty array
  const [products, setProducts] = useState<string[]>([]);

  // useEffect to call server to fetch the products, this is callback fct.

  useEffect(() => {
    console.log("fetching products in", categ);
    setProducts(["Clothing", "Household"]);
  }, [categ]);

  return <div>ProductList</div>;
};

export default ProductList;
