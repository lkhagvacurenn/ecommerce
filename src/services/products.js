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
    return res.data.products.slice(0,10);
  } catch (err) {
    console.error("Error fetching products:", err);
    return []; 
  }
};

export  async function getRecommendedProducts() {
  try {
    const res = await axios.get(BASE);
    return res.data.products.slice(5,15);
  } catch (err) {
    console.error("Error fetching products:", err);
    return []; 
  }
};