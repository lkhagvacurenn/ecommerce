import { getBestSellerProducts, getRecommendedProducts } from '../services/products'
import ProductsGrid from '../components/ProductsGrid'
import { useEffect, useState } from 'react';
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
      <ProductsGrid title ={"Recommendations. Best matching products for you."} products={recommendedProducts} />
      <ProductsGrid title ={"Best Sellers. Best selling of the month."} products={bestSellerProducts} />
    </div>
    
  )
}

export default Home