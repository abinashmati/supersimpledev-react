import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductGrid";

import "./HomePage.css";
import { useSearchParams } from "react-router";

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);

  //get the search query string parameter from url
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const fetchHomeData = async () => {
      let urlPath = search ? `/api/products?search=${search}` : "/api/products";

      const response = await axios.get(urlPath);

      setProducts(response.data);
    };

    fetchHomeData();
  }, [search]);

  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
