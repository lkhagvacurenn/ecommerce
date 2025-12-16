import { useState, useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import UserLog from '../Profile/UserLog'
import { getAccountInfo } from '../services/api'
const Profile = () => {
  const navigate = useNavigate();
  const [accountInfo, setAccountInfo] = useState(null); // Add state for accountInfo

  // Initialize from localStorage so navigation after register/login shows the correct view
  useEffect(() => {
    async function fetchAccountInfo() {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const result = await getAccountInfo(token);
          if (result?.success) {
          const accountData = result.data;
          setAccountInfo(accountData);
          } else {
            console.warn('Failed to fetch account info:', result?.message);
            navigate('/profile/login');         
            setAccountInfo(null);
          }
        } else {
          navigate('/profile/login');         
          setAccountInfo(null); // Reset accountInfo if no token
        }
      } catch {
        navigate('/profile/login');         
        setAccountInfo(null); // Reset accountInfo on error
      }
    }
    fetchAccountInfo();
  }, [navigate]);

  return (
    <div className='mx-auto my-10 w-full'>  
      {accountInfo && <UserLog accountInfo={accountInfo} />}
    </div>
  )
}

export default Profile