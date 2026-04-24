import { Github, Linkedin, Mail, ArrowUp, Twitter, Pen, Palette, MessageCircle } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/ahmed9088",
    icon: Github,
    label: "View my GitHub profile",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ahmed-saffar-memon-b26298294",
    icon: Linkedin,
    label: "Connect on LinkedIn",
  },
  {
    name: "X / Twitter",
    href: "https://x.com/@Ahmed11445237",
    icon: Twitter,
    label: "Follow me on X",
  },
  {
    name: "Behance",
    href: "https://www.behance.net/ahmedmemon22",
    icon: Palette,
    label: "View my Behance portfolio",
  },
  {
    name: "Medium",
    href: "https://medium.com/@memon1ahmed",
    icon: Pen,
    label: "Read my articles on Medium",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/923073762276",
    icon: MessageCircle,
    label: "Chat on WhatsApp",
  },
  {
    name: "Email",
    href: "mailto:memon1ahmed@gmail.com",
    icon: Mail,
    label: "Send me an email",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto px-6 max-w-6xl py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a
              href="#home"
              className="text-lg font-bold tracking-tight mb-2 block hover:text-primary transition-colors"
            >
              it's <span className="text-primary">AHMED</span>
            </a>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Ahmed Saffar Memon. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="p-2.5 rounded-full border border-border hover:border-primary hover:text-primary transition-all"
                aria-label={link.label}
              >
                <link.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
