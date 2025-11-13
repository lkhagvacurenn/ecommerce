import ProductsGrid from './ProductsGrid'
import {  useState } from 'react';
const Pagination = ({products}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageLength = 8;
    const pagesLength = Math.ceil(products.length/pageLength);

    const indexOfLast = currentPage * pageLength;
    const indexOfFirst = indexOfLast - pageLength;
    const currentProducts = products.slice(indexOfFirst,indexOfLast);   
  return (
    <div className='w-full'>
        <ProductsGrid products={currentProducts}/>
        <div className='flex gap-1 items-center justify-end'>
            { Array.from({length:pagesLength}, (_,i)=>i+1).map((page) => (
                <button 
                key={page} 
                className={`px-3 py-1 ${
                currentPage === page ? 'bg-boxBgClr rounded' : ''
                }`}
                onClick={()=>setCurrentPage(page)}
                >
                    {page}
                </button>
            ))
            }
        </div>
    </div>
  )
}

export default Pagination