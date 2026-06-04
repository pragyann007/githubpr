import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { userContext } from '../../context/UserContext';
import { useParams } from 'react-router-dom';
import { backendUrl, githubUrl } from '../../constants/backend';

const SinglePullRequest = () => {
    const {repoName} = useParams();
    console.log(repoName);


    const {user} = useContext(userContext);



    useEffect(()=>{
        fetchPullRequests();

    },[])
    const fetchPullRequests = async ()=>{
const res = await axios.get(`${githubUrl}/repos/${user.username}/${repoName}/pulls`)
console.log(res.data);
    }
  return (
    <div>SinglePullRequest</div>
  )
}

export default SinglePullRequest