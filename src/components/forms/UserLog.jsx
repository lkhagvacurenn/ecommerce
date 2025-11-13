import { useState } from "react";
import Button from "../buttons/Button";
import {FaRegEyeSlash, FaRegEye} from 'react-icons/fa'
const UserLog = () => {
    const [isUser,setUser] = useState(true);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [rePassword,setRePassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    function handleClick(e){
        e.preventDefault();
        alert('successfull')
    }
    function handlePassword(e){
        setPassword(e.target.value)
    }
    function handleEmail(e){
        setEmail(e.target.value)
    }
    function handleRePassword(e){
        setRePassword(e.target.value);
    }
  return (
    <div className="py-12">
        <form className='flex flex-col gap-3 min-w-80' onSubmit={handleClick}>
            <h1 className='text-center font-bold text-3xl'>
                {isUser ? 'Login' : 'Register' }
            </h1>
            <label htmlFor="email" className='flex flex-col font-bold'>
                Email
                <input value={email} onChange={handleEmail} className='font-normal outline-none border border-secondaryClr rounded-md p-1' type="email" placeholder='example@example.com' id="email" name="email" autoComplete="email"/>
            </label>
            <label className='flex flex-col font-bold' htmlFor="password">
                Password
                <div className="border border-secondaryClr rounded-md py-1 px-3 flex justify-between">
                   <input value={password} onChange={handlePassword} className='font-normal outline-none' type={showPassword ? 'text' : 'password'} id="password" name="password" />
                    <button type='button' 
                    aria-pressed={showPassword}
                    aria-label={showPassword ? "Hide password" : "Show password"} 
                    onClick={()=> setShowPassword(prev => !prev)}>
                        {showPassword ? <FaRegEyeSlash/> : <FaRegEye/>}
                    </button> 
                </div>
                
            </label>
            {!isUser && 
                <label className='flex flex-col font-bold' htmlFor="repPassword">
                    Password (Again)
                    <div className="border border-secondaryClr rounded-md py-1 px-3 flex justify-between">
                         <input value={rePassword} onChange={handleRePassword} className='font-normal outline-none' type={showRePassword ? 'text' : 'password'} id="rePassword" name="rePassword" />
                        <button type="button"
                            aria-pressed={showRePassword}
                            aria-label={showRePassword ? "Hide rePassword" : "Show rePassword"} 
                            onClick={()=> setShowRePassword(prev => !prev)}>
                            {showRePassword ? <FaRegEyeSlash/> : <FaRegEye/>}
                        </button> 
                    </div>    
                    <p role="alert" aria-live='assertive' className="font-normal text-red-500">
                        {(password === rePassword || rePassword ==='' ) ? '': 'It does not match the password'}
                    </p>            
                </label>
            }
            <Button className='py-1 bg-black text-white rounded-lg transition ease-in-out hover:opacity-80' type='submit'>Continue</Button>
        </form>
        <div className="mt-5 border-t-2 text-center border-secondaryClr">
            {isUser ? <p>New User? <button className="text-blue-500 hover:text-blue-600" onClick={()=>setUser(false)}>Create an account</button></p> : <p>Already a member? <button className="text-blue-500 hover:text-blue-600" onClick={() =>setUser(true)}>Login</button></p>}
        </div>
    </div>
    
  )
}

export default UserLog