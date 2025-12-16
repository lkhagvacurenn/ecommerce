import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/buttons/Button";
import {FaRegEyeSlash, FaRegEye} from 'react-icons/fa'
import { loginUser } from "../services/api";
const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [res, setRes] = useState({success: false, message: ''});
    async function handleClick(e){
        e.preventDefault();
        const res = await loginUser({email, password });
        setRes(res);
        try{
            if(!res.success) throw new Error(res.message);
            navigate('/profile');
        } catch (error) {
            console.error("Login failed:", error);
         }
    }

    function handlePassword(e){
        setPassword(e.target.value)
    }
    function handleEmail(e){
        setEmail(e.target.value)
    }
  return (
    <div className="py-12 max-w-80 w-full mx-auto">
        <form className='flex flex-col gap-3 min-w-80' onSubmit={handleClick}>
            <h1 className='text-center font-bold text-3xl'>
                Login
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
            {!res.success && <span className='text-red-500'>{res.message}</span>}
            <Button className='py-1 bg-black text-white rounded-lg transition ease-in-out hover:opacity-80' type='submit'>Login</Button>
        </form>
        <div className="mt-5 border-t-2 text-center border-secondaryClr">
            <NavLink to="/profile/register" className="text-blue-500 hover:text-blue-600">Create an account</NavLink>
        </div>
    </div>
  )
}

export default Login