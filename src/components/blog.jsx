import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";

const blogPosts = [
  {
    id: "why-i-switched-from-wordpress-to-react",
    title: "Why I Stopped Using WordPress and Switched to React",
    excerpt:
      "After building 20+ WordPress sites for clients, I finally made the jump to React. Here's what pushed me over the edge and why I'm never going back to theme builders.",
    date: "Apr 18, 2026",
    readTime: "6 min read",
    category: "Web Development",
    tags: ["React", "WordPress", "Career"],
    content: `I remember my first freelance project, a small bakery website in Hyderabad. WordPress was the obvious choice. Starter theme, a few plugins, done in two days. The client was happy, I got paid, life was good.

Fast forward to project number 20-something, and I was spending more time wrestling with plugin conflicts than actually building anything. One update would break the contact form, another would mess up the mobile layout. I was basically a full-time plugin babysitter.

The turning point came when a client asked me to add a simple feature: a dynamic pricing calculator. In WordPress, this meant finding a plugin, realizing it didn't quite do what we needed, then hacking around it with custom JavaScript that felt held together with tape and hope.

That's when I thought: why am I fighting the tool instead of using one that actually fits?

I spent two weekends learning React. The first project I rebuilt (that same bakery site) loaded 3x faster and I had complete control over every pixel. No more guessing what a plugin does behind the scenes.

Now, I still use WordPress when it genuinely makes sense. Blogs, content-heavy sites where the client needs to update things daily. But for anything interactive, custom, or performance-critical? React wins every time.

The biggest lesson wasn't about the tech. It was about being honest with myself about when a tool stops serving you and starts holding you back.`,
  },
  {
    id: "freelancing-mistakes-first-year",
    title: "5 Dumb Mistakes I Made in My First Year of Freelancing",
    excerpt:
      "I undercharged, over-promised, and once accidentally deleted a client's production database. Here are the lessons I wish someone had told me before I started freelancing in 2022.",
    date: "Apr 10, 2026",
    readTime: "8 min read",
    category: "Freelancing",
    tags: ["Freelancing", "Career", "Lessons"],
    content: `Let me be real: my first year of freelancing was a beautiful disaster. I made money, sure. But I also made every mistake in the book. Here's what I learned the hard way so you don't have to.

**1. Charging Too Little Because I Was "New"**

My first Fiverr gig? I built an entire e-commerce dashboard for $50. Fifty dollars. That's less than what the client probably spent on lunch that week. I told myself "I'm just starting out, I need reviews." But what I was really doing was training clients to undervalue my work, and training myself to believe I wasn't worth more.

The fix: I started pricing based on the value I delivered, not the hours I spent. A dashboard that saves a business owner 10 hours a week? That's worth thousands, not fifty bucks.

**2. Saying Yes to Everything**

"Can you also build a mobile app?" Sure. "Do you know blockchain?" Absolutely (I didn't). I was so afraid of losing clients that I'd agree to anything. The result? Late nights, missed deadlines, and work I wasn't proud of.

Now I say no to projects outside my strengths. Counterintuitively, my income went up because I started delivering exceptional work in my lane instead of mediocre work everywhere.

**3. Not Using Version Control Properly**

I was doing the classic "final_v2_REAL_final.zip" thing. Until the day I accidentally overwrote a client's production files. My stomach dropped. I spent 6 hours recovering from a backup that was two weeks old.

After that, I learned Git properly. Every project, every commit, every branch. Non-negotiable.

**4. Skipping the Contract**

"We're friends, we don't need a contract." Famous last words. A "friend" once asked for unlimited revisions on a logo project. Then wanted a complete redesign. Then ghosted when it was time to pay.

Now every project starts with a clear scope, timeline, and payment terms in writing. No exceptions.

**5. Ignoring My Health**

12-hour coding sessions, energy drinks for dinner, no exercise. By month 8, I had back pain, eye strain, and was genuinely miserable. I realized that being a successful freelancer means nothing if you wreck yourself getting there.

These days I take breaks, go for walks, and actually eat real food. Radical stuff, I know.

The truth is, most of this could've been avoided if I'd just asked someone who'd been through it. That's partly why I'm writing this. So maybe one person reads it and skips the $50 dashboard phase.`,
  },
  {
    id: "react-vs-nextjs-which-to-learn",
    title: "React vs Next.js: Which Should You Actually Learn First?",
    excerpt:
      "Everyone has an opinion on this. Here's mine, based on building production apps with both for the last 3 years. Spoiler: the answer depends on what you're building.",
    date: "Mar 28, 2026",
    readTime: "5 min read",
    category: "Tech",
    tags: ["React", "Next.js", "Learning"],
    content: `I see this question every week on Reddit and Twitter: "Should I learn React or Next.js first?" And honestly, most of the answers overcomplicate it.

Here's my take, based on actually shipping real products with both.

**Learn React first. Period.**

Next.js IS React. It's React with extra features bolted on: server-side rendering, file-based routing, API routes, image optimization. If you don't understand React fundamentals (components, state, hooks, props), Next.js will feel like magic you can't debug.

I made this mistake early on. I jumped straight into Next.js because everyone on Twitter said it was "the future." Then I spent three days debugging a hydration error because I didn't understand how React renders on the server vs. the client.

**When to move to Next.js:**

Once you're comfortable building a full React app (managing state, fetching data, handling routing with React Router), then Next.js becomes incredibly powerful. You'll actually understand WHY it does what it does.

For my freelance clients, here's my rough decision tree:

- **Simple portfolio or landing page?** Plain React + Vite. Fast to build, fast to deploy, no unnecessary complexity.
- **Blog, marketing site, or anything that needs SEO?** Next.js. Server-side rendering means Google can actually crawl your content.
- **Full web application with auth, dashboards, APIs?** Next.js with API routes. It's basically a full-stack framework at this point.

**The real answer nobody wants to hear:**

It doesn't matter that much which one you start with. What matters is that you build things. Real things. Not tutorial projects, but actual apps that solve actual problems.

I learned more from building one client's booking system than from 50 YouTube tutorials. Pick a tool, build something real, and you'll figure the rest out along the way.`,
  },
  {
    id: "how-i-built-saas-from-hyderabad",
    title: "Building a SaaS Product from Hyderabad, Pakistan",
    excerpt:
      "People assume you need to be in Silicon Valley to build tech products. I built and launched a SaaS platform from my room in Hyderabad. Here's what that actually looks like.",
    date: "Mar 15, 2026",
    readTime: "7 min read",
    category: "Startup",
    tags: ["SaaS", "Pakistan", "Startup"],
    content: `There's this weird assumption in the tech world that real products only come from San Francisco or maybe Bangalore. Everything else is "outsourced work."

I want to push back on that.

Last year, I built a patient management system for a healthcare startup. Full SaaS. Multi-tenant architecture, role-based access, appointment scheduling, billing, the works. The tech stack was Next.js on the frontend, Node.js with PostgreSQL on the backend, deployed on Vercel and Railway.

I built it from my room in Hyderabad, Sindh. On a laptop that occasionally overheats when I have too many Chrome tabs open.

**The advantages nobody talks about:**

- **Lower cost of living = longer runway.** I didn't need VC money to survive while building. My monthly expenses are a fraction of what they'd be in any Western city.
- **The timezone actually helps.** My US and EU clients send requirements at the end of their day. I work on them during my day. By the time they wake up, it's done. They think I'm a wizard.
- **Hunger is a feature.** When you're from a place where opportunities aren't handed to you, you learn to create them. Every project feels like it matters because it does.

**The challenges are real, though:**

- Internet outages at the worst possible times. I now have two backup connections.
- Payment processing is a nightmare. Receiving payments from international clients involves multiple conversion steps.
- The "where are you based?" question on client calls. Some clients hear "Pakistan" and hesitate. Their loss, honestly. I've delivered for the ones who didn't.

**What I've learned:**

Your location doesn't define your capability. The same Next.js runs the same way whether I write it in Hyderabad or San Francisco. The code doesn't know where it was written.

If you're a developer in Pakistan, or anywhere outside the traditional tech hubs, just build. Ship. Put it online. Let the work speak for itself. That's what I did, and three years later, I have clients from 8 different countries who've never asked where my office is.

Because the work is the proof.`,
  },
];

export default function Blog() {
  const [expandedPost, setExpandedPost] = useState(null);

  return (
    <section id="blog" className="py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="section-label">Blog</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Thoughts &
            <br />
            <span className="text-muted-foreground">experiences</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              viewport={{ once: true }}
              className="card-dark overflow-hidden"
            >
              {/* Post Header — Always Visible */}
              <div
                className="p-6 md:p-8 cursor-pointer group"
                onClick={() =>
                  setExpandedPost(expandedPost === post.id ? null : post.id)
                }
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-3xl">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {expandedPost === post.id ? "Close" : "Read"}
                    <ArrowRight
                      className={`w-4 h-4 transition-transform duration-300 ${
                        expandedPost === post.id ? "rotate-90" : ""
                      }`}
                    />
                  </span>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedPost === post.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="border-t border-border"
                >
                  <div className="p-6 md:p-8 md:px-12 max-w-3xl">
                    {post.content.split("\n\n").map((paragraph, i) => {
                      // Bold headings
                      if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                        return (
                          <h4
                            key={i}
                            className="text-lg font-bold mt-8 mb-3 text-foreground"
                          >
                            {paragraph.replace(/\*\*/g, "")}
                          </h4>
                        );
                      }
                      // Inline bold
                      if (paragraph.includes("**")) {
                        const parts = paragraph.split(/\*\*(.*?)\*\*/g);
                        return (
                          <p
                            key={i}
                            className="text-muted-foreground leading-relaxed mb-4 text-[15px]"
                          >
                            {parts.map((part, j) =>
                              j % 2 === 1 ? (
                                <strong key={j} className="text-foreground font-semibold">
                                  {part}
                                </strong>
                              ) : (
                                part
                              )
                            )}
                          </p>
                        );
                      }
                      // List items
                      if (paragraph.startsWith("- ")) {
                        return (
                          <ul key={i} className="space-y-2 mb-4 ml-4">
                            {paragraph.split("\n").map((line, j) => (
                              <li
                                key={j}
                                className="text-muted-foreground text-[15px] leading-relaxed list-disc"
                              >
                                {line.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, "$1")}
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      // Regular paragraph
                      return (
                        <p
                          key={i}
                          className="text-muted-foreground leading-relaxed mb-4 text-[15px]"
                        >
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
