import React from 'react'

const CheckoutForm = ({title,icon,fields}) => {
  return (
    <form className='flex flex-wrap  border rounded-md p-2 mb-5'>
        <h2 className='basis-full flex items-center gap-1 border-b p-2'>{icon} {title}</h2>
        {fields.map(field =>(
            <label htmlFor={field.name} className={`flex flex-col ${field.basis} p-2`}>
                <span className='font-bold'>{field.label}</span>
                <input 
                type={field.type}
                id={field.name}
                 name={field.name} 
                 className='border rounded-md w-full px-2 outline-none' 
                 />
            </label>
        ))}
    </form>
  )
}

export default CheckoutForm