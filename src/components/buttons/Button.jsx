
const Button = ({onClick,type,width,children}) => {
  return (
    <button onClick={onClick} className={`py-1 px-3 bg-black text-white rounded-2xl transition ease-in-out hover:opacity-80 w-${width}`} type={type}>
        {children}
    </button>
  )
}

export default Button