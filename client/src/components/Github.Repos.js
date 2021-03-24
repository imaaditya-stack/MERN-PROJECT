/* eslint-disable react/jsx-no-target-blank */
import React from "react";

const GitHubRepos = ({ repos, profile }) => {
  return (
    <div>
      {repos?.map((repo) => (
        <div key={repo.id} className="repo">
          <div>
            <h4 className="text-capitalize">
              <a href={repo.html_url} target="_blank">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div>
            <ul>
              <li className="badge badge-primary">
                Stars: {repo.stargazers_count}
              </li>
              <li className="badge badge-dark">
                Watchers: {repo.watchers_count}
              </li>
              <li className="badge badge-light">Forks: {repo.forks_count}</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GitHubRepos;
