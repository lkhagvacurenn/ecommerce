
const Button = ({onClick,type,width='fit',children}) => {
  return (
    <button onClick={onClick} className={`flex rounded-2xl transition-all duration-150 hover:scale-105 active:scale-95 active:bg-gray-100 py-1 px-3 bg-black text-white text-sm h-fit   w-${width}`} type={type}>
        {children}
    </button>
  )
}

export default Button