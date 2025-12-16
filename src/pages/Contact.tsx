import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import emailjs from "emailjs-com";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await emailjs.send(
        "service_6wo5jfh",   
        "template_ilnr9aq",  
        {
          name,
          email,
          message,
        },
        "pqD0xSgSLBXyLLzZo"   
      );

      setStatus("Message sent successfully 🚀");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error(error);
      setStatus("Failed to send message ❌");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-7xl font-orbitron font-bold text-white mb-8">
              Get in <span className="gradient-text">Touch</span>
            </h1>

            <p className="text-xl text-gray-400 font-rajdhani mb-12">
              Ready to start your next project with us? Fill out the form or reach
              out directly.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary">
                  <Mail />
                </div>
                <div>
                  <h3 className="font-orbitron font-bold">Email</h3>
                  <p className="text-gray-400">tute11726@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary">
                  <Phone />
                </div>
                <div>
                  <h3 className="font-orbitron font-bold">Phone</h3>
                  <p className="text-gray-400">+91 9342562047</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-primary">
                  <MapPin />
                </div>
                <div>
                  <h3 className="font-orbitron font-bold">HQ</h3>
                  <p className="text-gray-400">Royapettah, Chennai</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-8 rounded-2xl border border-white/10 space-y-6"
            onSubmit={sendEmail}
          >
            <div>
              <label className="block text-sm font-orbitron text-gray-400 mb-2 uppercase">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/10 rounded p-4 text-white focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-orbitron text-gray-400 mb-2 uppercase">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/10 rounded p-4 text-white focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-orbitron text-gray-400 mb-2 uppercase">
                Message
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/10 rounded p-4 text-white focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Tell us about your project..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary text-white font-orbitron font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              Send Message
            </button>

            {status && (
              <p className="text-center text-primary font-bold mt-4">
                {status}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </div>
  );
}
