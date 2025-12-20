import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Palette,
  Smartphone,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const services = [
  {
    icon: <Monitor />,
    title: "Web Development",
    desc: "Next-gen React apps built for speed.",
  },
  {
    icon: <Palette />,
    title: "Branding",
    desc: "Visual identities that make impact.",
  },
  {
    icon: <Smartphone />,
    title: "App Design",
    desc: "Fluid mobile-first UX experiences.",
  },
  {
    icon: <Zap />,
    title: "Automation",
    desc: "Smart workflows to scale business.",
  },
];

export default function ServicesCarousel() {
  const [rotation, setRotation] = useState(0);
  const [paused, setPaused] = useState(false);

  const angleStep = 360 / services.length;

  // 📱 Responsive values
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
  const CARD_WIDTH = isMobile ? 220 : 260;
  const CARD_HEIGHT = isMobile ? 280 : 320;
  const RADIUS = isMobile ? 180 : 240;

  // 🔄 Auto spin
  useEffect(() => {
    if (paused) return;

    const id = setInterval(() => {
      setRotation((r) => r - 0.25);
    }, 16);

    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="relative h-[420px] sm:h-[460px] w-full flex items-center justify-center perspective-1000"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {/* CAROUSEL */}
      <motion.div
        animate={{ rotateY: rotation }}
        transition={{ ease: "linear", duration: 0.1 }}
        className="relative w-full h-full transform-style-preserve-3d"
      >
        {services.map((s, i) => {
          const cardAngle = i * angleStep;
          const totalAngle = (rotation + cardAngle) % 360;
          const normalized = totalAngle < 0 ? totalAngle + 360 : totalAngle;

          const isFront = normalized >= 315 || normalized <= 135;

          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                transform: `rotateY(${cardAngle}deg) translateZ(${RADIUS}px)`,
              }}
            >
              <div
                className={`
                  glass-card rounded-2xl p-6 h-full text-center neon-purple
                  transition-all duration-300
                  ${
                    isFront
                      ? "opacity-100 scale-100"
                      : "opacity-20 blur-[3px] scale-90 pointer-events-none"
                  }
                `}
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="w-14 h-14 mx-auto mb-6 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  {s.icon}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white">
                  {s.title}
                </h3>

                <p className="text-gray-400 text-sm">{s.desc}</p>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* DESKTOP ARROWS ONLY */}
      <button
        onClick={() => setRotation((r) => r + angleStep)}
        className="
          hidden sm:flex
          absolute left-6
          w-12 h-12 rounded-full
          glass-card neon-purple
          items-center justify-center
          hover:scale-110 transition
        "
      >
        <ChevronLeft className="text-white" />
      </button>

      <button
        onClick={() => setRotation((r) => r - angleStep)}
        className="
          hidden sm:flex
          absolute right-6
          w-12 h-12 rounded-full
          glass-card neon-purple
          items-center justify-center
          hover:scale-110 transition
        "
      >
        <ChevronRight className="text-white" />
      </button>
    </div>
  );
}
