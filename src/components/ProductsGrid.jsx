import ProductCard from "./ProductCard"
const ProductsGrid = ({products}) => {
  return (
    <div className="w-full">
    <div className='h-fit grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5'>
        { products.map((product) => (
            <ProductCard key={product.id} d={product} />
          ))
        }
    </div>
    </div>
    
  )
}

export default ProductsGrid