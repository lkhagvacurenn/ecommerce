import ProductCard from "./ProductCard"
const ProductsGrid = ({title,products}) => {
const sentences = title.split(/[.!?]\s*/);
  return (
    <div className="my-5">
    <h2 className="font-bold text-[24px]">{sentences[0]}. <span className="text-spanClr hidden sm:inline">{sentences[1]}</span></h2>
    <div className='w-full h-fit mt-2 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5'>
        { products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        }
    </div>
    </div>
    
  )
}

export default ProductsGrid