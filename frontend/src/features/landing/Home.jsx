import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/common/Navbar'
import axios from "axios"
import { githubUrl } from '../../constants/backend';
import { userContext } from '../../context/UserContext';

const Home = () => {

  const [repos,setRepos] = useState([]);

  const {user,loading} = useContext(userContext)
  console.log("home",user)

  useEffect(()=>{
    fetchCurrentUserRepos()

  },[user])

  const fetchCurrentUserRepos = async ()=>{
    const res = await axios.get(`${githubUrl}/users/${user.username}/repos`)
    console.log(res.data);
    setRepos(res.data);
  }
  return (
    <div>
        <Navbar/>
        <div className="repo-lists">
          <h2 className='text-2xl font-bold text-gray-800 mb-4' >Your Repositories</h2>
          {
            repos.length > 0 ? (
              <ul className='space-y-2' >
                {
                  repos.map((repo)=>{
                    return (
                      <li key={repo.id} className='p-4 border rounded-lg hover:bg-gray-800' >
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className='text-white  font-semibold text-lg ' >{repo.name}</a>
                        <p className='text-gray-300' >{repo.description}</p>
                      </li>
                    )
                  })
                }
              </ul>
            ):(
              <p className='text-gray-600' >No repositories found.</p>
            ) 
          }

        </div>
    </div>
  )
}

export default Home