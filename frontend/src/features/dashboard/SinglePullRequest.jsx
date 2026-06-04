import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { userContext } from '../../context/UserContext';
import { useParams } from 'react-router-dom';
import { backendUrl, githubUrl } from '../../constants/backend';

const SinglePullRequest = () => {
    const { repoName } = useParams();
    console.log(repoName);
    const [pullRequests, setPullRequests] = useState([]);


    const { user } = useContext(userContext);



    useEffect(() => {
        fetchPullRequests();

    }, [])
    const fetchPullRequests = async () => {
        const res = await axios.get(`${githubUrl}/repos/${user.username}/${repoName}/pulls`)
        console.log(res.data);
        setPullRequests(res.data);
    }
    return (
        <div>
            <h2 className='text-2xl font-bold text-white mb-4' >Pull , for {repoName}</h2>
            {
                pullRequests.length > 0 ? (
                    <ul className='space-y-2' >
                        {
                            pullRequests.map((pr) => {
                                return (
                                    <li key={pr.id} className='p-4 border rounded-lg hover:bg-gray-800' >
                                        <a href={pr.html_url} target="_blank" rel="noopener noreferrer" className='text-white  font-semibold text-lg ' >{pr.title}</a>
                                        <p className='text-gray-300' >{pr.user.login}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                ) : (
                    <p className='text-gray-600' >No pull requests found.</p>
                )
            }
        </div>
    )
}

export default SinglePullRequest