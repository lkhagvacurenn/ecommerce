import React from 'react'
import CheckoutForm from '../components/forms/CheckoutForm'
import { FaRegUser, FaSearchLocation, FaWallet } from 'react-icons/fa'
import Button from '../components/buttons/Button'

const Checkout = () => {
  return (
    <>
        <h1 className='basis-full font-bold text-2xl'>Checkout</h1>
        <div className='sm:flex w-full gap-5'>
            <div className='basis-[50%]'>
                <CheckoutForm 
                title='Contact info' 
                icon={<FaRegUser/>}
                fields={[
                    {label:'Phone number',name:'phoneNumber',type:'tel',basis:'basis-1/2',required:true},
                    {label:'Email address',name:'email',type:'email',basis:'basis-1/2',required:true}
                ]}
                />
                <CheckoutForm 
                title='Shipping address' 
                icon={<FaSearchLocation/>}
                fields={[
                    {label:'First name',name:'firstName',type:'text',basis:'basis-1/2',required:true},
                    {label:'Last Name',name:'lastName',type:'text',basis:'basis-1/2',required:true},
                    {label:'Address line 1',name:'address1',type:'text',basis:'basis-[70%]',required:true},
                    {label:'Apt, Suite',name:'apt',type:'text',basis:'basis-[30%]',required:true},
                    {label:'Address line 2',name:'address2',type:'text',basis:'basis-full',},
                    {label:'City',name:'city',type:'text',basis:'basis-1/2',required:true},
                    {label:'Postal Code',name:'postalCode',type:'number',basis:'basis-1/2',required:true},
                ]}
                />
                <CheckoutForm
                title='Payment'
                icon={<FaWallet/>}
                fields={[
                    {label:'Card Number', name:'cardNumber', type:'number',basis:'basis-full'},
                    {label:'Name on the card', name:'cardName',type:'text',basis:'basis-full'},
                    {label:'Expiration date', name:'expireDate', type:'date',basis:'basis-[70%]'},
                    {label:'CVV',name:'cvv',type:'number',basis:'basis-[30%]'}
                ]}
                />
            </div>
            <div className='basis-[50%]'>
                <h2>Order summary</h2>
                <ul className='w-full my-5'>
                    <li className='border-t'>product list will be here</li>
                    <li className='border-t'>product list will be here</li>
                    <Button  width='full'>Confirm Order</Button>
                </ul>
            </div>
        </div>
    </>
    
    
  )
}

export default Checkout