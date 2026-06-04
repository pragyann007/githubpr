import React from 'react'
import Sidebar from '../../components/dashboard/Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
    // 
  return (
    <div className='flex ' >
        <div className='w-[19%] h-screen' >
        <Sidebar/>
        </div>

        <main className=' w-screen h-screen ' >
            <Outlet/>
        </main>
    </div>
  )
}

export default DashboardLayout