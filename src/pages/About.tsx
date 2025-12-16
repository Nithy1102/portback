import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

/* TEAM IMAGES */
import team1 from "/prabu.jpeg";
import team2 from "/agar.jpeg";
import team3 from "/nithy.jpeg";

export default function About() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const team = [
  {
    id: 1,
    name: "Agaran",
    role: "Founder & Creative Director",
    img: team2,
    bio: "Agaran is the creative force behind the brand, shaping vision, identity, and user experience. With a deep passion for futuristic design and digital storytelling, he pushes boundaries to craft interfaces that feel alive, immersive, and emotionally engaging. His focus is on turning complex ideas into elegant, human-centered experiences."
  },
  {
    id: 2,
    name: "Prabu Rao",
    role: "Co-Founder & CEO",
    img: team1,
    bio: "Prabu specializes in high-performance system architecture and scalable backend solutions. He ensures that every product is secure, fast, and built to scale. With a strong engineering mindset and problem-solving approach, he bridges the gap between ambitious ideas and reliable execution."
  },
  {
    id: 3,
    name: "Nithyanantham",
    role: "Co-Founder & COO",
    img: team3,
    bio: "Nithyanantham blends creativity with engineering to build powerful, end-to-end solutions. From interactive frontends to robust backend systems, he focuses on performance, animation, and seamless user interaction. He believes technology should not only work flawlessly but also feel intuitive and inspiring."
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
              Agran, Prabu Rao, and Nithyanantham
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

        {/* TEAM SECTION */}
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
                           group neon-purple neon-purple-hover"
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

      {/* ================= TEAM POPUP GRID (FULL) ================= */}
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
  );
}
