import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Send, Mail, MapPin, ArrowUpRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("sending");
    const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Ahmed,\n\nMy name is ${formData.name}.\n\n${formData.message}\n\nReply to: ${formData.email}`
    );
    window.location.href = `mailto:memon1ahmed@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 800);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] mb-4 block underline underline-offset-8">Get in touch</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-12 uppercase leading-none">COLLAB</h2>

            <div className="space-y-12">
              <div className="flex gap-8 group">
                <div className="p-4 rounded-full bg-muted group-hover:bg-primary group-hover:text-background transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black opacity-30 uppercase tracking-widest mb-1 font-mono">Mail Me</p>
                  <a href="mailto:memon1ahmed@gmail.com" className="text-2xl font-bold hover:text-primary transition-colors italic">memon1ahmed@gmail.com</a>
                </div>
              </div>

              <div className="flex gap-8 group">
                <div className="p-4 rounded-full bg-muted group-hover:bg-primary group-hover:text-background transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black opacity-30 uppercase tracking-widest mb-1 font-mono">Location</p>
                  <p className="text-2xl font-bold italic">Karachi, Pakistan</p>
                </div>
              </div>
            </div>

            <div className="mt-20 p-8 rounded-[2rem] bg-muted/30 border-2 border-dashed border-border flex items-center justify-between group cursor-pointer hover:border-primary transition-colors">
              <span className="text-lg font-bold">Open for new projects</span>
              <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center group-hover:rotate-45 transition-transform">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-muted/20 p-8 md:p-12 rounded-[3rem] border border-border"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center gap-6 py-20 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-500" />
                  <h3 className="text-3xl font-black">Mail Client Opened!</h3>
                  <p className="text-muted-foreground">Your default mail app should have opened with the message pre-filled. Hit send from there and I'll get back to you soon.</p>
                  <Button variant="outline" className="rounded-full" onClick={() => setStatus("idle")}>
                    Send Another
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                  onSubmit={handleSubmit}
                >
                  <div className="space-y-2 text-left">
                    <label htmlFor="contact-name" className="text-xs font-black uppercase tracking-widest opacity-40 ml-2 font-mono">Full Name</label>
                    <Input
                      id="contact-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-transparent border-0 border-b-2 border-border rounded-none px-2 py-6 text-xl focus-visible:ring-0 focus-visible:border-primary transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <label htmlFor="contact-email" className="text-xs font-black uppercase tracking-widest opacity-40 ml-2 font-mono">Email Address</label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-transparent border-0 border-b-2 border-border rounded-none px-2 py-6 text-xl focus-visible:ring-0 focus-visible:border-primary transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2 text-left">
                    <label htmlFor="contact-message" className="text-xs font-black uppercase tracking-widest opacity-40 ml-2 font-mono">Your Message</label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-transparent border-0 border-b-2 border-border rounded-none px-2 py-6 text-xl focus-visible:ring-0 focus-visible:border-primary transition-colors min-h-[150px] resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={status === "sending"}
                    size="xl"
                    className="w-full rounded-full py-8 text-xl group bg-primary text-primary-foreground font-black uppercase tracking-tighter disabled:opacity-60"
                  >
                    {status === "sending" ? (
                      <><Loader2 className="mr-2 w-5 h-5 animate-spin" /> Sending…</>
                    ) : (
                      <><Send className="mr-2 w-5 h-5" /> Send Message</>
                    )}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}