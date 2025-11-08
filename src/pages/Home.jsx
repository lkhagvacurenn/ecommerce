import { getBestSellerProducts, getRecommendedProducts } from '../services/products'
import HorizontalScroll from '../components/HorizontalScroll'
import { useEffect, useState } from 'react';
import FooterHero from '../components/FooterHero';
const Home = () => {
  const [bestSellerProducts,setBestSellerProducts] = useState([]);
  const [recommendedProducts,setRecommendedProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [best, recommended] = await Promise.all([
          getBestSellerProducts(),
          getRecommendedProducts()
        ]);
        setBestSellerProducts(best || []);
        setRecommendedProducts(recommended || []);
      } catch(err) {
        console.error(err);
      }
    })();
},[]);

  return (
    <div className=''>
      <HorizontalScroll title ={"Recommendations. Best matching products for you."} products={recommendedProducts} />
      <HorizontalScroll title ={"Best Sellers. Best selling of the month."} products={bestSellerProducts} />
      <FooterHero/>
    </div>
    
  )
}

export default Home