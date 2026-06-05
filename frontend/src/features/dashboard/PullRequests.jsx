import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { userContext } from "../../context/UserContext";
import { githubAppInstallUrl, githubUrl } from "../../constants/backend";
import { Link } from "react-router-dom";

const PullRequests = () => {
  const [repos, setRepos] = useState([]);
  const { user } = useContext(userContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage, setReposPerPage] = useState(10);
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);
  const totalPages = Math.ceil(repos.length / reposPerPage);





  useEffect(() => {
    if (user?.username) {
      fetchCurrentUserRepos();
    }
  }, [user]);

  const fetchCurrentUserRepos = async () => {
    try {
      const res = await axios.get(
        `${githubUrl}/users/${user.username}/repos?per_page=100&sort=updated`
      ); setRepos(res.data);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <main className="max-w-6xl mx-auto">
        <h4 className="text-2xl font-semibold mb-6">
          Repositories
        </h4>

        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-gray-900 shadow-lg">
          <table className="w-full min-h-[700px] text-sm text-left">
            <thead className="bg-gray-800 text-gray-300 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Link</th>
                <th className="px-4 py-3">Connect</th>

              </tr>
            </thead>

            <tbody className="h-40" >
              {repos.length > 0 ? (
                currentRepos.map((repo) => (
                  <tr
                    key={repo.id}
                    className="border-t border-gray-800 hover:bg-gray-800 transition"
                  >
                    <td className="px-4 py-3 font-medium text-white">
                      <Link to={`/pull-requests/${repo.name}`} >
                        {repo.name}
                      </Link>

                    </td>

                    <td className="px-4 py-3 text-gray-400">
                      {repo.description || "No description"}
                    </td>

                    <td className="px-4 py-3">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        View Repo
                      </a>
                    </td>

                    <td className="px-4 py-3" >
                      <a
                      target="_blank"
                      className="bg-blue-400 p-2 rounded-xl text-white"  href={`${githubAppInstallUrl}`}>Connect</a>                    </td>


                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-10 text-gray-500"
                  >
                    No repositories found
                  </td>
                </tr>
              )}
            </tbody>


          </table>
          <div className="flex w-full justify-center items-center mt-20" >

            {

              Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`mx-1 px-3 py-1 rounded ${currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                >
                  {page}
                </button>
              ))

            }
          </div>
        </div>
      </main>
    </div>
  );
};

export default PullRequests;