export default async function handler(req, res) {
  const githubToken = process.env.PERSONAL_GITHUB_TOKEN;
  const githubUsername = process.env.GITHUB_USERNAME;

  // Validate environment variables early
  if (!githubUsername) {
    return res.status(500).json({ error: "GITHUB_USERNAME is not defined" });
  }

  if (!githubToken) {
    return res.status(500).json({ error: "GitHub token is not defined" });
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${githubUsername}/repos?per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    console.log("GitHub response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GitHub API error:", errorText);
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const repos = await response.json();

    if (!Array.isArray(repos)) {
      throw new Error("GitHub API did not return an array");
    }

    // Sort by last updated
    repos.sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    );

    res.status(200).json(repos);
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    res.status(500).json({ error: "Failed to fetch repositories" });
  }
}
