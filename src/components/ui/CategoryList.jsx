import  { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import ProductContext from '../../context/ProductsContext';
const CategoryList = () => {
    const {categories} = useContext(ProductContext);
    const navigate = useNavigate();
    const handleChange = (e)=> {
            const params = new URLSearchParams();
            if (e.target.value) params.set("category", e.target.value);
            const qs = params.toString();
            navigate(qs ? `/products?${qs}` : '/products');
            }
  return (
    <div>
            <h2 className="font-bold text-xl">Categories</h2>
            <ul>
                {categories.map(c => {
                    return(
                    <li key={c.id}>
                            <label className="inline-flex items-center gap-2">
                                <input type="radio" name='category' onChange={handleChange}
                                 value={c.slug} />
                                <span>{c.name}</span>
                            </label>                   
                        </li> 
                    )
                    
                }
                )}
            </ul>
    </div>
    )
}

export default CategoryList