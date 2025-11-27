import React, {useEffect, useState } from 'react'
import {getCategories} from '../services/api'
import PriceRangeSlider from './PriceRangeSlider';
const SideBar = () => {
    const [categories, setCategories] = useState([]);
    const [rangeValues, setRangeValues] = useState({min:0, max:100});
    useEffect(()=>{
        (async ()=>{
            try{
                const categoriesAsync = await getCategories();
                setCategories(categoriesAsync || [] )
            } catch(err){
                console.error(err);
            }
        })()
    },[])
    const handleRangeChange = (value)=> {
        setRangeValues(value)
    }
  return (
    <div className='w-60'>
        <div>
            <h2 className="font-bold text-xl">Categories</h2>
            <ul>
                {categories.map(c => {
                    return(
                    <li key={c.id}>
                            <label className="inline-flex items-center gap-2">
                                <input type="checkbox" name={c.name} value={c.name} />
                                <span>{c.name}</span>
                            </label>                   
                        </li> 
                    )
                    
                }
                )}
            </ul>
        </div>
       <PriceRangeSlider min={0} max={10000} onChange={handleRangeChange} width='15rem' currencyText='$' step={50} />
        <form className="mt-5 border-t border-slate-200 pt-4">
            <h2 className="font-bold text-xl mb-2">Sort</h2>
            <div className="space-y-1 text-sm">
                <label className="flex items-center gap-2">
                <input type="radio" name="sort" id="popular" value="Most Popular" />
                Most Popular
                </label>
                <label className="flex items-center gap-2">
                <input type="radio" name="sort" id="rating" value="Best Rating" />
                Best Rating
                </label>
                <label className="flex items-center gap-2">
                <input type="radio" name="sort" id="newest" value="Newest" />
                Newest
                </label>
                <label className="flex items-center gap-2">
                <input type="radio" name="sort" id="lowToHigh" value="Price low to high" />
                Price Low–High
                </label>
                <label className="flex items-center gap-2">
                <input type="radio" name="sort" id="highToLow" value="Price high to low" />
                Price High–Low
                </label>
            </div>
        </form>

    </div>
  )
}

export default SideBar