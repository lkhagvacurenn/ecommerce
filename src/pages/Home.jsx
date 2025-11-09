import { getBestSellerProducts, getCategories, getRecommendedProducts } from '../services/products'
import Carousel from '../components/Carousel'
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';
import FooterHero from '../components/FooterHero';
import { CategoryCard } from '../components/CategoryCard';
const Home = () => {
  const [bestSellerProducts,setBestSellerProducts] = useState([]);
  const [recommendedProducts,setRecommendedProducts] = useState([]);
  const [categories,setCategories] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const [best, recommended,category] = await Promise.all([
          getBestSellerProducts(),
          getRecommendedProducts(),
          getCategories(),
        ]);
        setBestSellerProducts(best || []);
        setRecommendedProducts(recommended || []);
        setCategories(category || []);
      } catch(err) {
        console.error(err);
      }
    })();
},[]);

  return (
    <div className=''>
      <Carousel title ={"Start exploring. Good things are waiting for you"} data={categories} card={CategoryCard} />
      <Carousel title ={"Recommendations. Best matching products for you."} data={recommendedProducts} card={ProductCard} />
      <Carousel title ={"Best Sellers. Best selling of the month."} data={bestSellerProducts} card={ProductCard} />
      <FooterHero/>
    </div>
    
  )
}

export default Home