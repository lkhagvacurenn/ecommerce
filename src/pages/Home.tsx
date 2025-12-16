import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import FooterHero from "../components/FooterHero";
import  CategoryCard  from "../components/ui/CategoryCard.jsx";
import ProductCard from "../components/ProductCard.jsx"
import { getAllCategories, getAllProducts} from "../services/api.js";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [newProducts, setNewProducts] = useState([]);

    useEffect(() => {
  (async () => {
    try {
      // categories
      const catRes = await getAllCategories();
      if (catRes.success) setCategories(catRes.data);

      const recommendedRes = await getAllProducts({
        limit: 10,
        sortBy: "-discountPercent"
      });
      console.log(recommendedRes.data.items)
      if (recommendedRes.success) setRecommended(recommendedRes.data.items);

      const newRes = await getAllProducts({
        limit: 10,
        sortBy: "-createdAt"
      });
      if (newRes.success) setNewProducts(newRes.data.items);

    } catch (err) {
      console.error("Home fetch error:", err);
    }
  })();
}, []);

  return (
    <div>
      <Carousel
        title={"Start exploring. Good things are waiting for you"}
        data={categories}
        card={CategoryCard}
      />
      
      <Carousel
        title={"New Products. New trendy products for you"}
        data={newProducts}
        card={ProductCard}
      />
      <Carousel
        title={"Biggest sell. All good price for you"}
        data={recommended}
        card={ProductCard}
      />

      <FooterHero />
    </div>
  );
};

export default Home;
