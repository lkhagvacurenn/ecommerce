import { createContext,useState,useEffect } from 'react'
import { getBestSellerProducts, getProducts, getRecommendedProducts, } from '../services/products'

const ProductContext = () => {
    const Context = createContext();
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
    <>
    </>
  )
}

export default ProductContext