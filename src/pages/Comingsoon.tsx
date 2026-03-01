import { motion } from "framer-motion";

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-white px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card neon-purple neon-purple-hover
                   p-12 rounded-2xl text-center max-w-xl"
      >
        <h1 className="text-4xl font-black uppercase mb-4">
          Coming Soon 
        </h1>

        <p className="text-white/70 mb-6">
          This page is under construction.  
          Something awesome is on the way.
        </p>

        <a
          href="/"
          className="px-6 py-3 border border-primary rounded-xl
                     text-primary hover:bg-primary hover:text-white transition"
        >
          Back to Home
        </a>
      </motion.div>
    </div>
  );
}