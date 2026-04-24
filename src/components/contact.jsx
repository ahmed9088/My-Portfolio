import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Linkedin, Github, Twitter, Pen, Palette, MessageCircle, Apple } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Gmail",
    value: "memon1ahmed@gmail.com",
    href: "mailto:memon1ahmed@gmail.com",
  },
  {
    icon: Apple,
    label: "iCloud",
    value: "ahmedhere1@icloud.com",
    href: "mailto:ahmedhere1@icloud.com",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+92 307 376 2276",
    href: "https://wa.me/923073762276",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Hyderabad, Pakistan",
    href: null,
  },
];

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/ahmed9088",
    label: "GitHub Profile",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/ahmed-saffar-memon-b26298294",
    label: "LinkedIn Profile",
  },
  {
    icon: Twitter,
    href: "https://x.com/@Ahmed11445237",
    label: "X / Twitter Profile",
  },
  {
    icon: Palette,
    href: "https://www.behance.net/ahmedmemon22",
    label: "Behance Portfolio",
  },
  {
    icon: Pen,
    href: "https://medium.com/@memon1ahmed",
    label: "Medium Blog",
  },
];

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
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
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

            <div className="space-y-5">
              {contactInfo.map((item) => {
                const Wrapper = item.href ? "a" : "div";
                const wrapperProps = item.href
                  ? {
                      href: item.href,
                      target: item.href.startsWith("http") ? "_blank" : undefined,
                      rel: item.href.startsWith("http") ? "noopener noreferrer" : undefined,
                    }
                  : {};
                return (
                  <Wrapper
                    key={item.label}
                    {...wrapperProps}
                    className="flex items-center gap-4 group"
                  >
                    <div className="p-3 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">
                        {item.label}
                      </p>
                      <p className="font-semibold group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </Wrapper>
                );
              })}

              {/* Social Links */}
              <div className="flex gap-3 pt-4 flex-wrap">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl border border-border hover:border-primary hover:text-primary transition-all"
                    aria-label={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
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