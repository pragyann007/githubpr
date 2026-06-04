import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Register from '../../features/auth/Register'
import useUser from '../../hooks/useUser'
import { userContext } from '../../context/UserContext'
import axios from "axios"
import { backendUrl } from '../../constants/backend'

const Navbar = () => {
    const navElemes = [
        {
            name:'Home',
            link:"/"
        },
        {
            name:'About',
            link:"/about"
        },
        {
            name:'Contact',
            link:"/contact"
        },
       {
        name:"How it works",
        link:"/how-it-works"
       },
       {
        name:"Apply",
        link:"/apply"
       }


    ]
    

    const {user,loading} = useContext(userContext)

    const logout = async ()=>{
        const res = await axios.get(`${backendUrl}/api/auth/logout`,{
            withCredentials:true,
        })
        console.log(res.data);
        window.location.reload()
    }
   
    
  return (
    <div  >
        <nav className='w-screen h-4 flex justify-between items-center p-8 text-white  ' >

            <div className="left">
                <h2 className='text-2xl cursor-pointer font-bold text-cyan-400' >Git Beat</h2>

            </div>
            <div className="right">
                {
                    navElemes.map((ele,index)=>{
                        return (
                            <Link
                             key={index} href={ele.link} className='px-4 py-2 text-md hover:text-gray-300  ' >{ele.name}</Link>
                        )
                    })
                }
            </div>

            <div className="registerbtn flex gap-4  ">
                {
                    user?(
                        <div className='flex items-center gap-4 ' >
                            <img src={user.avatar_url} alt="avatar" className='w-8 h-8 rounded-full' />
                            <span>{user.username}</span>
                        </div>
                    ):(
                        <Register/>                    )
                }

{
                user && (
                    <div className='ml-4' >
                        <button 
                        onClick={logout}
                        className='px-4 py-2 text-md border-1  border-white rounded-lg hover:bg-white hover:text-black cursor-pointer    ' >Logout</button>
                    </div>
                )
            }
             
            </div>

           


        </nav>
        

    </div>
  )
}

export default Navbar