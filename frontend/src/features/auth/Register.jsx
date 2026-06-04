import React from 'react'
import {FaGithub} from "react-icons/fa"

const Register = () => {
    const handleGithubLogin = () => {
        window.location.href = 'http://localhost:3000/api/auth/github';
    }
  return (
    <div className='flex justify-center items-center  ' >
        
          
            <button 
            onClick={handleGithubLogin}
            className='p-2 cursor-pointer mt-3 w-full flex  justify-center items-center gap-4 border-1 border-white rounded-xl ' >
                <span>
                <FaGithub />

                </span>
                Register with Github 
            </button>
       
    </div>
  )
}

export default Register