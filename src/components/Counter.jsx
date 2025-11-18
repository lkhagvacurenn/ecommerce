import {FaMinus,FaPlus} from 'react-icons/fa'

const Counter = ({orderCount,onClick,stock=Infinity}) => {
  return (
    <div className="flex gap-2 items-center rounded-2xl w-fit py-1 px-3 bg-boxBgClr text-sm">
        <button onClick={(e)=>onClick(-1,e)} className="rounded-[50%] bg-white p-1 disabled:opacity-30" disabled={orderCount <= 0}>
            <FaMinus className="fill-secondaryClr"/>
        </button>
        <span>{orderCount}</span>
        <button onClick={(e)=> onClick(1,e)} className="rounded-[50%] bg-white p-1 disabled:opacity-30" disabled={orderCount >= stock}>
            <FaPlus className="fill-secondaryClr"/>
        </button>
    </div>
)}

export default Counter