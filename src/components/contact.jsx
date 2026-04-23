import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Linkedin, Github } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, sending, sent, error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    // Simple mailto fallback
    const mailtoLink = `mailto:memon1ahmed@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${encodeURIComponent(formData.email)}`;
    window.location.href = mailtoLink;
    
    setTimeout(() => {
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Contact</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
              Let's work
              <br />
              <span className="text-muted-foreground">together</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-md">
              Have a project in mind or just want to say hello? I'd love to hear
              from you. Fill out the form and I'll get back to you as soon as
              possible.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:memon1ahmed@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="p-3 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">
                    Email
                  </p>
                  <p className="font-semibold group-hover:text-primary transition-colors">
                    memon1ahmed@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary/10">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">
                    Location
                  </p>
                  <p className="font-semibold">Hyderabad, Pakistan</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <a
                  href="https://github.com/ahmed9088"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl border border-border hover:border-primary hover:text-primary transition-all"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ahmed-saffar-memon-b26298294"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl border border-border hover:border-primary hover:text-primary transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="card-dark p-8 md:p-10">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-semibold mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="input-dark"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-semibold mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-dark"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-semibold mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="input-dark resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary w-full py-4 text-base disabled:opacity-60"
                >
                  {status === "sending" ? (
                    "Sending..."
                  ) : status === "sent" ? (
                    "Message Sent! ✓"
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}