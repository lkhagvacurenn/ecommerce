import  { useContext } from 'react'
import SideBar from '../components/SideBar'
import Pagination from '../components/Pagination'
import ProductContext from '../context/ProductsContext'
const Products = () => {
 const { filteredProducts, loading } = useContext(ProductContext);

  if (loading) {
    return <div className="p-6 text-center">Loading products...</div>;
  }
  return (
    <div className='sm:flex my-5'>
      <div className='hidden sm:block'>
          <SideBar/>
      </div>
      <Pagination products={filteredProducts}/>
    </div>
  )
}

export default Products