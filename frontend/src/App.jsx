import React from 'react'
import { Route, Routes } from "react-router-dom"
import Register from './features/auth/Register'
import Home from './features/landing/Home'
import PrivateRoutes from './routes/PrivateRoutes'
import MainDashboard from './features/dashboard/MainDashboard'
import DashboardLayout from './features/dashboard/DashboardLayout'
import PullRequests from './features/dashboard/PullRequests'
import AiSummary from './features/dashboard/AiSummary'
import Diff from './features/dashboard/Diff'
import AiCmts from './features/dashboard/AiCmts'
import Fixes from './features/dashboard/Fixes'
import SecurityScan from './features/dashboard/SecurityScan'
import SinglePullRequest from './features/dashboard/SinglePullRequest'
import GithubSetup from './features/common/GithubSetup'

const App = () => {
  return (
 <>
 <Routes>
  <Route path='/' element={<Home/>}  />
  <Route path='/setup' element={<GithubSetup/>} />
  <Route path='/register' element={<Register/>} />

 <Route element={<PrivateRoutes/>} >
 <Route element={<DashboardLayout/>} >
 <Route path='/dashboard' element={<MainDashboard/>} />
 <Route path='/pull-requests' element={<PullRequests/>}/>
 <Route path='/pull-requests/:repoName' element={<SinglePullRequest/>}/>
 <Route path='/ai-summary' element={<AiSummary/>} />
 <Route path='/ai-comments' element={<AiCmts/>} />
  <Route path='/diff' element={<Diff/>} />
  <Route path='/fixes' element={<Fixes/>} />
  <Route path='/security' element={<SecurityScan/>} />
 
 </Route>
  
 </Route>


 </Routes>
 </>
  )
}

export default App