import  { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import Pagination from '../components/Pagination'
import { getProducts } from '../services/products'
const Products = () => {
  const [products,setProducts] = useState([]);
  useEffect(()=>{
    (async ()=> {
      try{
        const productsAsync = await getProducts();
        setProducts(productsAsync || []);
      }catch(err){
        console.error(err);
      }
    })()
  },[])
  return (
    <div className='sm:flex my-5'>
      <div className='hidden sm:block'>
          <SideBar/>
      </div>
      <Pagination products={products}/>
    </div>
  )
}

export default Products