import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import { githubUrl } from "../../constants/backend";

const SinglePullRequest = () => {
  const { repoName } = useParams();
  const { user } = useContext(userContext);

  const [pullRequests, setPullRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.username && repoName) {
      fetchPullRequests();
    }
  }, [user, repoName]);

  const fetchPullRequests = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${githubUrl}/repos/${user.username}/${repoName}/pulls`
      );

      setPullRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch PRs:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">
          Pull Requests for{" "}
          <span className="text-blue-400">{repoName}</span>
        </h1>

        <div className="rounded-xl border border-gray-800 bg-gray-900 shadow-lg overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-800 text-gray-300 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center py-10 text-gray-400">
                    Loading pull requests...
                  </td>
                </tr>
              ) : pullRequests.length > 0 ? (
                pullRequests.map((pr) => (
                  <tr
                    key={pr.id}
                    className="border-t border-gray-800 hover:bg-gray-800 transition"
                  >
                    <td className="px-4 py-3 font-medium text-white">
                      {pr.title}
                    </td>

                    <td className="px-4 py-3 text-gray-400">
                      {pr.user?.login || "Unknown"}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          pr.state === "open"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-purple-500/20 text-purple-400"
                        }`}
                      >
                        {pr.state}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-10 text-gray-500"
                  >
                    No pull requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SinglePullRequest;