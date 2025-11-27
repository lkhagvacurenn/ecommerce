import axios from "axios";

const BASE = "https://dummyjson.com/products";

export  async function getProducts() {
  try {
    const res = await axios.get(BASE);
    console.log(res);
    return res.data.products;
  } catch (err) {
    console.error("Error fetching products:", err);
    return []; 
  }
};

export  async function getBestSellerProducts() {
  try {
    const res = await axios.get(BASE);
    const products = res.data.products;
    const bestSellers = products.sort((a,b)=>a.rating-b.rating).slice(0,10);
    return bestSellers
  } catch (err) {
    console.error("Error fetching products:", err);
    return []; 
  }
};

export  async function getRecommendedProducts() {
  try {
    const res = await axios.get(BASE);
    const products = res.data.products;
    const recommendedProducts = products.sort((a,b) => a.discountPercentage-b.discountPercentage).slice(0,10);
    return recommendedProducts;
  } catch (err) {
    console.error("Error fetching products:", err);
    return []; 
  }
};

export async function getCategories() {
  try{
    const res = await axios.get(`${BASE}/categories`);
    return res.data.slice(0,5).map((d) => ({ id: d.slug, name:d.name, url:d.url }));;
  }catch(err) {
      console.error("Error fetching products:", err);
      return [];
    }
}

export  async function getProductById(id) {
  try {
    const res = await axios.get(`${BASE}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return []; 
  }
};
