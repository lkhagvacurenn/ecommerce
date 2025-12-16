import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/buttons/Button";
import {FaRegEyeSlash, FaRegEye} from 'react-icons/fa'
import { registerUser } from "../services/api";

const Register = () => {
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const [password,setPassword] = useState('');
    const [rePassword,setRePassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [res, setRes] = useState({success: false, message: ''});
    
    const navigate = useNavigate();

    async function handleClick(e){
        e.preventDefault();
        const res = await registerUser({ name, email, password });
        setRes(res);
        try {
            if (!res.success) throw new Error(res.message);
            // Profile component reads localStorage to determine logged-in state
            navigate('/profile');
        } catch (error) {
            console.error("Registration failed:", error);
         }
        
    }

    function handleName(e){
        setName(e.target.value)
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
    <div className="py-12 max-w-80 w-full mx-auto">
        <form className='flex flex-col gap-3 min-w-80' onSubmit={handleClick}>
            <h1 className='text-center font-bold text-3xl'>
                Register
            </h1>
            <label htmlFor="name" className='flex flex-col font-bold'>
                Name
                <input value={name} onChange={handleName} className='font-normal outline-none border border-secondaryClr rounded-md p-1' type="text" placeholder='Enter your name' id="name" name="name" autoComplete="name"/>
            </label>
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
            {!res.success && <span className='text-red-500'>{res.message}</span>}
            <Button className='py-1 bg-black text-white rounded-lg transition ease-in-out hover:opacity-80' type='submit'>Register</Button>
        </form>
        <div className="mt-5 border-t-2 text-center border-secondaryClr">
            <NavLink to="/profile/login" className="text-blue-500 hover:text-blue-600">Already have an account? Login</NavLink>
        </div>
    </div>
    
  )
}

export default Register