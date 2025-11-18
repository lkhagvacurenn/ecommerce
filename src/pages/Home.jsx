import React, { useContext, useMemo } from "react";
import Carousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";
import FooterHero from "../components/FooterHero";
import  CategoryCard  from "../components/ui/CategoryCard.jsx";
import ProductContext  from "../context/ProductsContext"; // use the hook from the provider

const Home = () => {
  const { allProducts = [], categories = [], loading, catsLoading } = useContext(ProductContext);

  const recommendedProducts = useMemo(() => {
    return [...allProducts]
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)) 
      .slice(0, 10);
  }, [allProducts]);

  const bestSellerProducts = useMemo(() => {
    return [...allProducts]
      .sort((a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0)) 
      .slice(0, 10);
  }, [allProducts]);

  if (catsLoading) return <div className="p-6 text-center">Loading categories…</div>;
  if (loading) return <div className="p-6 text-center">Loading products…</div>;

  return (
    <div>
      <Carousel
        title={"Start exploring. Good things are waiting for you"}
        data={categories}
        card={CategoryCard}
      />

      <Carousel
        title={"Recommendations. Best matching products for you."}
        data={recommendedProducts}
        card={ProductCard}
      />

      <Carousel
        title={"Best Sellers. Best selling of the month."}
        data={bestSellerProducts}
        card={ProductCard}
      />

      <FooterHero />
    </div>
  );
};

export default Home;
