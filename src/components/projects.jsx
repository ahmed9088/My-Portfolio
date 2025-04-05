"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Github, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeTab, setActiveTab] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace the username and token with strings directly
  const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME;
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
  console.log("Token:", import.meta.env.VITE_GITHUB_TOKEN);
  console.log("Username:", import.meta.env.VITE_GITHUB_USERNAME);
  fetch("https://api.github.com/users/ahmed9088/repos", {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
  })
    .then((res) => res.json())
    .then((data) => console.log("DATA:", data))
    .catch((err) => console.error("ERROR:", err));
      

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
          headers: {
            Authorization: `token ${GITHUB_TOKEN}`,
          },
        });

        // Sort repositories by last updated
        const sortedRepos = response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setRepos(sortedRepos);

        // Generate unique categories from repo topics
        const allTopics = ["All", ...new Set(sortedRepos.flatMap((repo) => repo.topics || []))];
        setCategories(allTopics);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching GitHub repos:", err);
        setError("Failed to fetch repositories.");
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const filteredRepos = () => {
    if (activeTab === "All") return repos;
    return repos.filter((repo) => repo.topics && repo.topics.includes(activeTab));
  };

  return (
    <section id="project" className="py-20 bg-gradient-to-b from-background/80 to-background">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1 text-sm border-primary/20">
            My GitHub
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8" />
          <p className="text-muted-foreground max-w-2xl">
            Explore my GitHub repositories with dynamic filtering and seamless UI experience.
          </p>
        </motion.div>

        {/* Tabs for Repository Categories */}
        <Tabs defaultValue="All" onValueChange={setActiveTab} className="w-full max-w-6xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Repository Content */}
          <TabsContent value={activeTab} className="mt-4">
            {loading ? (
              <p>Loading repositories...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRepos()
                  .slice(0, showAll ? filteredRepos().length : 6)
                  .map((repo, index) => (
                    <motion.div
                      key={repo.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="h-full overflow-hidden bg-card/50 backdrop-blur-sm border-primary/10">
                        <CardContent className="p-4">
                          <h3 className="text-lg font-semibold mb-2">{repo.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                            {repo.description || "No description provided"}
                          </p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
                          {repo.language && (
                            <Badge variant="secondary" className="text-xs">
                              {repo.language}
                            </Badge>
                          )}
                          <Button asChild size="sm" variant="default" className="gap-1">
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                              Code
                            </a>
                          </Button>
                          {repo.homepage && (
                            <Button asChild size="sm" variant="secondary" className="gap-1">
                              <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                                Demo
                              </a>
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Show More/Show Less Button */}
        {repos.length > 6 && (
          <div className="flex justify-center mt-6">
            <Button onClick={() => setShowAll(!showAll)} variant="default">
              {showAll ? "Show Less" : "Show More"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
