import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { backendUrl } from '../../constants/backend'
import { userContext } from '../../context/UserContext'

const GithubSetup = () => {
    const [searchParams,serSearchParams] = useSearchParams()
    console.log(searchParams.get("installation_id"));

    const {user,loading} = useContext(userContext)
    console.log(user,searchParams.get("installation_id"));
    

    useEffect(()=>{
        if(searchParams.get("installation_id") && user && !loading){
            console.log(user.userId,searchParams.get("installation_id"));

            sendInstallation()
        }
    },[loading,user,searchParams])

    const sendInstallation = async()=>{
        const res = await axios.post(`${backendUrl}/api/github/install`,{
            userId:user.userId,
            githubId:user.id,
            installationId:searchParams.get("installation_id")
            // use
        })

        console.log(res.data);
    }



  return (
    <div>
        <h1>Connected sucessfuly to github..</h1>
    </div>
  )
}

export default GithubSetup