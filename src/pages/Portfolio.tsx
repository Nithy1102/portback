import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";

/* ================= API ================= */
const PROJECT_API = "https://port-pp3k.onrender.com/api/projects";
const IMAGE_BASE = "https://port-pp3k.onrender.com/api/uploads";

/* ================= TYPES ================= */
type Project = {
  id: number;
  title: string;
  description: string;
  link: string;
  image: string | null;
};

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    fetch(PROJECT_API)
      .then((res) => res.json())
      .then(setProjects)
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="container mx-auto">
        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-orbitron font-bold text-white mb-12"
        >
          OUR <span className="text-secondary">Works</span>
        </motion.h1>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelected(project)}
              className="group relative aspect-video bg-card rounded-xl overflow-hidden
                         border border-white/10 hover:border-primary/60
                         cursor-pointer transition-all"
            >
              {/* IMAGE */}
              {project.image && (
                <img
                  src={`${IMAGE_BASE}/${project.image}`}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover
                             group-hover:scale-110 transition-transform duration-500"
                />
              )}

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/80 transition-colors" />

              {/* CENTER TEXT */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-orbitron text-2xl text-white/80 group-hover:scale-110 transition-transform">
                  {project.title}
                </span>
              </div>

              {/* BADGE */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-white text-xs font-bold rounded uppercase">
                Case Study
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999]
                       flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card neon-purple neon-purple-hover
                         max-w-3xl w-full rounded-2xl p-8 relative"
            >
              {/* CLOSE */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
              >
                <X size={24} />
              </button>

              {/* IMAGE */}
              {selected.image && (
                <img
                  src={`${IMAGE_BASE}/${selected.image}`}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
              )}

              {/* CONTENT */}
              <h2 className="text-3xl font-orbitron font-bold text-white mb-4">
                {selected.title}
              </h2>

              <p className="text-white/80 mb-6">
                {selected.description}
              </p>

              <a
                href={selected.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3
                           border border-primary rounded-xl
                           neon-purple neon-purple-hover"
              >
                <ExternalLink size={16} />
                Visit Project
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
