import React from 'react'
import MetrixCard from '../../components/dashboard/MetrixCard'

const MainDashboard = () => {
  return (
    <div className='p-8 ' >
        <h4 className='text-white text-md mb-4 ' >Metrices</h4>
        <div className="metrixes">
            <MetrixCard/>
        </div>
    </div>
  )
}

export default MainDashboard