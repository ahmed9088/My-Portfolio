export default async function handler(req, res) {
  const githubToken = process.env.GITHUB_TOKEN;
  const githubUsername = process.env.GITHUB_USERNAME;

  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`, {
      headers: {
        Authorization: `token ${githubToken}`,
        Accept: "application/vnd.github.mercy-preview+json", // ensures topics are available
      },
    });

    console.log("GitHub response status:", response.status);
    const repos = await response.json();
    console.log("GitHub response data:", repos);

    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }

    if (!Array.isArray(repos)) {
      console.error("Expected repos to be an array, but got:", repos);
      throw new Error("API did not return an array");
    }

    repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    res.status(200).json(repos);
  } catch (error) {
    console.error("Error in API endpoint fetching GitHub repos:", error);
    res.status(500).json({ error: "Failed to fetch repositories" });
  }
}
