import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, ExternalLink } from "lucide-react";
import { Link } from "wouter";

import LiquidChrome from "../components/LiquidEther";
import ServicesCarousel from "../components/ServicesCarousel";

import team1 from "/prabu.jpeg";
import team2 from "/agar.jpeg";
import team3 from "/nithy.jpeg";

/* ================= API ================= */
const PROJECT_API = "https://port-pp3k.onrender.com/api/projects";
const IMAGE_BASE = "https://port-pp3k.onrender.com/api/uploads";

/* ================= ANIMATIONS ================= */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

/* ================= TYPES ================= */
type Project = {
  id: number;
  title: string;
  description: string;
  link: string;
  image: string | null;
};

export default function Home() {
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
      role: "Co-Founder",
      img: team1,
      bio: "Prabu specializes in high-performance architecture and system design.",
    },
    {
      id: 3,
      name: "Nithyanantham",
      role: "Co-Founder",
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
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center"
          >
            <motion.span
              variants={fadeInUp}
              className="px-3 py-1 mb-5 border border-primary/10
                         rounded-full bg-primary/10 text-primary uppercase text-sm"
            >
              The Future of Digital
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-8xl font-black uppercase mb-8"
            >
              <span className="block text-white">Smart Solutions.</span>
              <span className="block text-primary">Real Impact.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="max-w-2xl text-xl text-gray-300 mb-10"
            >
              We build high-performance digital experiences merging futuristic
              design with cutting-edge tech.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex gap-6">
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="py-28 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-14 uppercase">
            Our Services
          </h2>
          <ServicesCarousel />
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="py-24 text-white">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8">
          {team.map((m) => (
            <motion.div
              key={m.id}
              layoutId={`card-${m.id}`}
              onClick={() => setSelectedId(m.id)}
              className="relative h-[400px] cursor-pointer rounded-xl overflow-hidden neon-purple"
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
        <AnimatePresence>
                {selectedMember && (
                  <motion.div
                    className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999]
                               flex justify-center items-center"
                    onClick={() => setSelectedId(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      layoutId={`card-${selectedMember.id}`}
                      className="popup-grid w-[100vw] h-[100vh] grid gap-4 p-6"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* IMAGE */}
                      <motion.img
                        layoutId={`img-${selectedMember.id}`}
                        src={selectedMember.img}
                        className="div3 rounded-xl w-full h-full object-cover glass-card"
                      />
        
                      {/* NAME */}
                      <motion.div
                        layoutId={`info-${selectedMember.id}`}
                        className="div1 glass-card rounded-xl p-6 text-4xl font-bold neon-purple neon-purple-hover"
                      >
                        {selectedMember.name}
                      </motion.div>
        
                      {/* ROLE */}
                      <div className="div2 glass-card rounded-xl p-6 text-xl text-primary neon-purple neon-purple-hover">
                        {selectedMember.role}
                      </div>
        
                      {/* EXTRA PANELS */}
                      <div className="div4 glass-card rounded-xl p-6 neon-purple neon-purple-hover">
                        Creative Thinker
                      </div>
        
                      <div className="div5 glass-card rounded-xl p-6 neon-purple neon-purple-hover">
                        {selectedMember.bio}
                      </div>
        
                      <div className="div6 glass-card rounded-xl p-4 neon-purple neon-purple-hover">
                        Leadership
                      </div>
        
                      <div className="div7 glass-card rounded-xl p-4 neon-purple neon-purple-hover">
                        Vision
                      </div>
        
                      <div className="div9 glass-card rounded-xl p-4 neon-purple neon-purple-hover">
                        Strategy
                      </div>
        
                      <div className="div10 glass-card rounded-xl p-4 neon-purple neon-purple-hover">
                        Experience
                      </div>
        
                      {/* CLOSE */}
                      <button
                        className="div11 glass-card rounded-xl flex items-center justify-center
                                   text-white text-3xl neon-purple neon-purple-hover"
                        onClick={() => setSelectedId(null)}
                      >
                        <X />
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
        </div>
      </section>

      {/* ================= PROJECTS (HOME) ================= */}
      <section className="py-24 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black mb-14 uppercase">
            Our Works
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((p) => (
              <motion.div
                key={p.id}
                onClick={() => setSelectedProject(p)}
                whileHover={{ scale: 1.03 }}
                className="relative h-[300px] cursor-pointer
                           rounded-xl overflow-hidden
                           glass-card neon-purple"
              >
                {p.image && (
                  <img
                    src={`${IMAGE_BASE}/${p.image}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                {/* 🔥 OVERLAY MUST NOT BLOCK CLICKS */}
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
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999]
                       flex items-center justify-center px-6"
            onClick={() => setSelectedProject(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card neon-purple
                         max-w-3xl w-full p-8 rounded-2xl relative
                         pointer-events-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white"
              >
                <X />
              </button>

              {selectedProject.image && (
                <img
                  src={`${IMAGE_BASE}/${selectedProject.image}`}
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
              )}

              <h2 className="text-3xl font-bold mb-4">
                {selectedProject.title}
              </h2>

              <p className="mb-6 text-white/80">
                {selectedProject.description}
              </p>

           <button
  onClick={(e) => {
    e.stopPropagation();

    console.log("OPENING 👉", selectedProject.link);

    if (!selectedProject.link || selectedProject.link.trim() === "") {
      alert("Project link not set in admin panel");
      return;
    }

    window.open(selectedProject.link, "_blank", "noopener,noreferrer");
  }}
  className="inline-flex items-center gap-2 px-6 py-3
             border border-primary rounded-xl
             neon-purple neon-purple-hover"
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
