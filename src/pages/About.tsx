import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/* TEAM IMAGES */
import team1 from "/prabu.jpeg";
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

export default function About() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const team = [
    {
      id: 1,
      name: "Agaran",
      role: "Founder & Creative Director",
      img: team2,
      bio:
        "Agaran is the creative force behind the brand, shaping vision, identity, and user experience.",
    },
    {
      id: 2,
      name: "Prabu Rao",
      role: "Co-Founder & CEO",
      img: team1,
      bio:
        "Prabu specializes in high-performance system architecture and scalable backend solutions.",
    },
    {
      id: 3,
      name: "Nithyanantham",
      role: "Co-Founder & COO",
      img: team3,
      bio:
        "Nithyanantham blends creativity with engineering to build powerful, end-to-end solutions.",
    },
  ];

  const selectedMember = team.find((m) => m.id === selectedId);

  return (
    <div className="min-h-screen bg-background pt-32 pb-32 px-6 overflow-x-hidden">
      <div className="container mx-auto space-y-28">

        {/* HERO */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-orbitron font-bold text-white"
        >
          About <span className="text-primary">Us</span>
        </motion.h1>

        {/* INTRO */}
        <motion.div className="max-w-4xl glass-panel p-10 md:p-12 rounded-2xl">
          <p className="text-xl text-gray-300 font-rajdhani leading-relaxed mb-6">
            <span className="text-white font-semibold">TUTE</span> is a
            next-generation digital studio focused on immersive,
            high-performance web experiences and intelligent digital products.
          </p>

          <p className="text-xl text-gray-300 font-rajdhani leading-relaxed">
            Founded in 2025 by{" "}
            <span className="text-white font-medium">
              Agaran, Prabu Rao, and Nithyanantham
            </span>
            , TUTE was created to push digital experiences beyond convention.
          </p>
        </motion.div>

        {/* WHAT WE DO */}
        <section className="max-w-5xl">
          <h2 className="text-4xl font-orbitron font-bold text-white mb-6">
            What We <span className="text-primary">Do</span>
          </h2>

          <ul className="grid md:grid-cols-2 gap-4 text-lg text-gray-300 font-rajdhani">
            <li>• High-performance websites & web apps</li>
            <li>• UI/UX & interaction design</li>
            <li>• Frontend engineering & animations</li>
            <li>• Scalable backend systems</li>
            <li>• AI-assisted & data-driven solutions</li>
            <li>• Technical consulting & architecture</li>
          </ul>
        </section>

        {/* VISION & MISSION */}
        <section className="grid md:grid-cols-2 gap-10">
          <div className="glass-panel p-8 rounded-2xl">
            <h2 className="text-3xl font-orbitron text-white mb-4">
              Our <span className="text-primary">Vision</span>
            </h2>
            <p className="text-lg text-gray-300 font-rajdhani leading-relaxed">
              To shape the future of digital interaction by blending aesthetics,
              performance, and intelligence.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-2xl">
            <h2 className="text-3xl font-orbitron text-white mb-4">
              Our <span className="text-primary">Mission</span>
            </h2>
            <p className="text-lg text-gray-300 font-rajdhani leading-relaxed">
              Helping startups and businesses turn ideas into scalable,
              future-ready digital products.
            </p>
          </div>
        </section>

        {/* VALUES */}
        <section className="glass-panel p-10 rounded-2xl max-w-5xl">
          <h2 className="text-4xl font-orbitron text-white mb-6">
            Our <span className="text-primary">Values</span>
          </h2>

          <ul className="grid md:grid-cols-2 gap-6 text-lg text-gray-300 font-rajdhani">
            <li>• Purpose-driven design</li>
            <li>• Performance & scalability</li>
            <li>• Human-centered technology</li>
            <li>• Precision & craftsmanship</li>
            <li>• Long-term thinking</li>
            <li>• Continuous innovation</li>
          </ul>
        </section>

        {/* TEAM */}
        <section className="py-24 text-white">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-16">
            Meet the <span className="text-primary">Team</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((m) => (
              <motion.div
                key={m.id}
                layoutId={`card-${m.id}`}
                onClick={() => setSelectedId(m.id)}
                className="relative h-[400px] cursor-pointer rounded-xl overflow-hidden
                           neon-purple neon-purple-hover"
              >
                <motion.img
                  layoutId={`img-${m.id}`}
                  src={m.img}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <motion.div
                  layoutId={`info-${m.id}`}
                  className="absolute bottom-0 w-full p-6
                             bg-gradient-to-t from-black to-transparent"
                >
                  <h3 className="text-xl font-bold">{m.name}</h3>
                  <p className="text-primary text-sm">{m.role}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* ================= POPUP ================= */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-[9999]
                       flex justify-center items-center"
            onClick={() => setSelectedId(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            {/* ================= DESKTOP (GLASS ONLY HERE) ================= */}
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

            {/* ================= MOBILE (NO GLASS, FULL IMAGE) ================= */}
            {isMobile && (
              <motion.div
                className="relative w-full h-full bg-black"
                onClick={(e) => e.stopPropagation()}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
              >
                {/* FULL IMAGE */}
                <img
                  src={selectedMember.img}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* SOLID CONTENT (NO GLASS) */}
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

                {/* CLOSE ICON */}
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
    </div>
  );
}
