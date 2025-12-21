import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, ExternalLink } from "lucide-react";
import { Link } from "wouter";

import LiquidChrome from "../components/LiquidEther";
import ServicesCarousel from "../components/ServicesCarousel";

import team1 from "/rao.jpeg";
import team2 from "/agar.jpeg";
import team3 from "/nithy.jpeg";

/* ================= MOBILE DETECTOR ================= */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

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

export default function Home() {
  const isMobile = useIsMobile();

  /* ================= TEAM ================= */
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const team = [
    {
      id: 1,
      name: "Agaran",
      role: "Founder",
      img: team2,
      bio: "Agaran is a visionary designer pushing the boundaries of digital experiences.",
    },
    {
      id: 2,
      name: "Prabu Rao",
      role: "CEO & Co-Founder",
      img: team1,
      bio: "Prabu specializes in high-performance architecture and system design.",
    },
    {
      id: 3,
      name: "Nithyanantham",
      role: "COO & Co-Founder",
      img: team3,
      bio: "Nithy blends creativity and engineering to create powerful solutions.",
    },
  ];

  const selectedMember = team.find((m) => m.id === selectedId);

  /* ================= PROJECTS ================= */
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch(PROJECT_API)
      .then((res) => res.json())
      .then(setProjects)
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* ================= HERO ================= */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <LiquidChrome
            baseColor={[0.35, 0.2, 0.85]}
            speed={1}
            amplitude={0.6}
            interactive
          />
        </div>

        <div className="absolute inset-0 bg-black/40 z-[1]" />

        <div className="relative z-[2] text-center px-6">
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-black uppercase mb-8">
            <span className="block text-white">Smart Solutions.</span>
            <span className="block text-primary">Real Impact.</span>
          </h1>

          <p className="max-w-2xl text-base sm:text-lg md:text-xl text-gray-300 mb-10 mx-auto">
            We build high-performance digital experiences merging futuristic
            design with cutting-edge tech.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 border border-primary text-white uppercase font-bold"
            >
              Get Started <ChevronRight className="inline ml-2 w-4 h-4" />
            </Link>

            <Link
              href="/portfolio"
              className="px-8 py-4 border border-white/20 bg-white/5 text-white uppercase font-bold"
            >
              View Work
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-20 sm:py-28 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-14 uppercase">Our Services</h2>
          <ServicesCarousel />
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="py-24 text-white">
        <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {team.map((m) => (
            <motion.div
              key={m.id}
              layoutId={`card-${m.id}`}
              onClick={() => setSelectedId(m.id)}
              className="relative h-[320px] sm:h-[400px] cursor-pointer
                         rounded-xl overflow-hidden neon-purple"
            >
              <motion.img
                layoutId={`img-${m.id}`}
                src={m.img}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <motion.div
                layoutId={`info-${m.id}`}
                className="absolute bottom-0 p-6 bg-gradient-to-t from-black"
              >
                <h3 className="text-xl font-bold">{m.name}</h3>
                <p className="text-primary">{m.role}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* ================= TEAM POPUP ================= */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              className="fixed inset-0 bg-black/70 z-[9999]"
              onClick={() => setSelectedId(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* ===== DESKTOP (GLASS) ===== */}
              {!isMobile && (
              <motion.div
                layoutId={`card-${selectedMember.id}`}
                className="popup-grid w-[100vw] h-[100vh] grid gap-4 p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.img
                  layoutId={`img-${selectedMember.id}`}
                  src={selectedMember.img}
                  className="div3 rounded-xl w-full h-full object-cover glass-card"
                />

                <motion.div
                  layoutId={`info-${selectedMember.id}`}
                  className="div1 glass-card rounded-xl p-6 text-4xl font-bold neon-purple neon-purple-hover"
                >
                  {selectedMember.name}
                </motion.div>

                <div className="div2 glass-card p-6 text-primary neon-purple neon-purple-hover">
                  {selectedMember.role}
                </div>

                <div className="div4 glass-card p-6 neon-purple neon-purple-hover">
                  Creative Thinker
                </div>

                <div className="div5 glass-card p-6 neon-purple neon-purple-hover">
                  {selectedMember.bio}
                </div>

                <div className="div6 glass-card p-4 neon-purple neon-purple-hover">
                  Leadership
                </div>

                <div className="div7 glass-card p-4 neon-purple neon-purple-hover">
                  Vision
                </div>

                <div className="div9 glass-card p-4 neon-purple neon-purple-hover">
                  Strategy
                </div>

                <div className="div10 glass-card p-4 neon-purple neon-purple-hover">
                  Experience
                </div>

                <button
                  className="div11 glass-card flex items-center justify-center
                             text-white text-3xl neon-purple neon-purple-hover"
                  onClick={() => setSelectedId(null)}
                >
                  <X />
                </button>
              </motion.div>
            )}

              {/* ===== MOBILE (SAME AS ABOUT US) ===== */}
              {isMobile && (
                <motion.div
                  className="relative w-full h-full bg-black"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                >
                  <img
                    src={selectedMember.img}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-6
                                  bg-black/80 text-white">
                    <h2 className="text-xl font-orbitron font-bold text-center">
                      {selectedMember.name}
                    </h2>

                    <p className="text-primary text-sm text-center mt-1">
                      {selectedMember.role}
                    </p>

                    <p className="text-sm text-gray-300 text-center mt-4">
                      {selectedMember.bio}
                    </p>

                    <button
                      onClick={() => setSelectedId(null)}
                      className="mt-4 w-full py-2 border border-primary text-primary"
                    >
                      Close
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-4 right-4 bg-black/70 p-3 rounded-full"
                  >
                    <X />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="py-24 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black mb-14 uppercase">Our Works</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {projects.map((p) => (
              <motion.div
                key={p.id}
                onClick={() => setSelectedProject(p)}
                whileHover={{ scale: 1.03 }}
                className="relative h-[220px] sm:h-[300px]
                           cursor-pointer rounded-xl overflow-hidden
                           glass-card neon-purple"
              >
                {p.image && (
                  <img
                    src={`${IMAGE_BASE}/${p.image}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center pointer-events-none">
                  <h3 className="text-2xl font-bold">{p.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROJECT MODAL ================= */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-[9999]
                       flex items-center justify-center px-6"
            onClick={() => setSelectedProject(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="glass-card neon-purple
                         max-w-3xl w-full max-h-[90vh]
                         overflow-y-auto p-6 sm:p-8
                         rounded-2xl relative"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-white/70"
              >
                <X />
              </button>

              {selectedProject.image && (
                <img
                  src={`${IMAGE_BASE}/${selectedProject.image}`}
                  className="w-full h-48 sm:h-64 object-cover rounded-xl mb-6"
                />
              )}

              <h2 className="text-3xl font-bold mb-4">
                {selectedProject.title}
              </h2>

              <p className="mb-6 text-white/80">
                {selectedProject.description}
              </p>

              <button
                onClick={() =>
                  window.open(
                    selectedProject.link,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="inline-flex items-center gap-2 px-6 py-3
                           border border-primary rounded-xl
                           neon-purple"
              >
                <ExternalLink size={16} />
                Visit Project
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
