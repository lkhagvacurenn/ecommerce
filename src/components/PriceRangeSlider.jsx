import { useCallback,useState,useRef,useEffect } from "react"
import './PriceRangeSlider.css'
const PriceRangeSlider = ({
    min,
    max,
    step =10,
    trackClr = 'var(--boxBgClr)',
    onChange,
    rangeClr ='var(--primaryClr)',
    width = "300px",
    currencyText = "$"
}) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal,setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);

    //Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min)/ (max - min))*100),
        [min,max]
    );
    useEffect(()=>{
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);
        if(range.current){
            range.current.style.left = `${minPercent}%`
            range.current.style.width = `${maxPercent-minPercent}%`
        }
    },[minVal,maxVal,getPercent]);

    //Get min and max values whein their state changes
    useEffect( ()=>{
        if(minVal != minValRef.current || maxVal != maxValRef.current){
            onChange({min:minVal, max:maxVal});
            minValRef.current = minVal;
            maxValRef.current = maxVal;
        }
    }, [minVal,maxVal,onChange]);


    const handleMinValueChange = (e) =>{  
        const value = Math.min(Number(e.target.value), maxVal-1);
            setMinVal(value)  
    }
    const handleMaxValueChange = (e) => {
        const value = Math.max(Number(e.target.value), minVal+1);
            setMaxVal(value) 
    }

  return (
        <div className=' mt-5 border-t border-slate-200'>
            <h2 className="font-bold text-xl">Price range</h2>
            <div className="mt-2" style={{width}}>
                <input className='thumb z-[3]' type="range" min={min} max={max} value={minVal} step={step}
                onChange={handleMinValueChange}
                style={{
                    width, zIndex: minVal > max - 100 && 5 ,
                }}/>
                <input className='thumb z-[4]' type="range" min={min} max={max} value={maxVal} step={step}
                onChange={handleMaxValueChange}
                style={{width}}/>
                <div className="relative">
                    <div className="absolute w-full h-2 rounded-md z-[1]" style={{backgroundColor:trackClr}}></div>
                    <div ref={range} className="absolute h-2 rounded-md z-[2]" style={{backgroundColor:rangeClr}}></div>
                </div>
            </div>
            <div className='flex justify-between mt-5'>
                <p>{currencyText}{minVal}</p>
                <p>{currencyText}{maxVal}</p>
            </div>
        </div>  
)}

export default PriceRangeSlider