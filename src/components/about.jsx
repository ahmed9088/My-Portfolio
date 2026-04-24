import { motion } from "framer-motion";
import { Code, MapPin, Briefcase, Coffee } from "lucide-react";

const stats = [
  { number: "50+", label: "Projects Completed" },
  { number: "4+", label: "Years Experience" },
  { number: "30+", label: "Happy Clients" },
  { number: "15+", label: "Technologies" },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="section-label">About Me</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-12">
            Passionate about creating
            <br />
            <span className="text-muted-foreground">digital experiences</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              viewport={{ once: true }}
              className="stat-card"
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bio Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.article
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="card-dark p-8 md:p-10"
          >
            <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
              <Coffee className="w-5 h-5 text-primary" />
              Who I Am
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm Ahmed Saffar Memon, a Freelance Full Stack Web Developer
                since 2022, helping individuals and businesses worldwide build
                secure, clean, and responsive web applications through platforms
                like <span className="text-foreground font-semibold">Upwork, Fiverr, LinkedIn, and Facebook</span>.
              </p>
              <p>
                I specialize in the MERN stack, Laravel, and Flutter for mobile.
                I'm also passionate about UI/UX design, technical writing, and
                creating user experiences that are both smooth and beautiful.
              </p>
              <p>
                Over the years, I've worked with 30+ clients across different
                industries — delivering everything from landing pages to
                full-scale SaaS platforms.
              </p>
            </div>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, x: 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="card-dark p-8 flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-1">
                  Location
                </h4>
                <p className="text-xl font-bold">Hyderabad, Pakistan</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Working with clients globally
                </p>
              </div>
            </div>

            <div className="card-dark p-8 flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-1">
                  Current Role
                </h4>
                <p className="text-xl font-bold">Freelancer</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Full Stack Developer · Since 2022
                </p>
              </div>
            </div>

            <div className="card-dark p-8 flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <Code className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-1">
                  Focus Areas
                </h4>
                <p className="text-xl font-bold">Web · Mobile · Design</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Full stack + UI/UX + Technical Writing
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
