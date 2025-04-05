// pages/api/github-repos.js

export default async function handler(req, res) {
    // Read secrets from your environment variables
    const githubToken = process.env.GITHUB_TOKEN;
    const githubUsername = process.env.GITHUB_USERNAME;
  
    try {
      // Call the GitHub API using the secret token.
      const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`, {
        headers: {
          Authorization: `token ${githubToken}`,
        },
      });
  
      // Parse the JSON from GitHub
      const repos = await response.json();
  
      // Optionally, sort repositories by last updated
      repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  
      // Return the repository data to the caller
      res.status(200).json(repos);
    } catch (error) {
      console.error("Error fetching GitHub repos:", error);
      res.status(500).json({ error: "Failed to fetch repositories" });
    }
  }
  