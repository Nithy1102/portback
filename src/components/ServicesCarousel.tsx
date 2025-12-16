import { useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Palette, Smartphone, Zap } from "lucide-react";

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

const CARD_WIDTH = 260;
const CARD_HEIGHT = 320;
const RADIUS = 240;

export default function ServicesCarousel() {
  const [rotation, setRotation] = useState(0);
  const angleStep = 360 / services.length;

  return (
    <div className="relative h-[440px] w-full flex items-center justify-center perspective-1000">
      <motion.div
        animate={{ rotateY: rotation }}
        transition={{ type: "spring", stiffness: 70, damping: 18 }}
        className="relative w-full h-full transform-style-preserve-3d"
      >
        {services.map((s, i) => {
          const cardAngle = i * angleStep;
          const totalAngle = (rotation + cardAngle) % 360;
          const normalized = totalAngle < 0 ? totalAngle + 360 : totalAngle;

          // 🟢 TWO CARDS FRONT ZONE (0°–180°)
          const isFront = normalized >= 315 || normalized <= 135;

          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                transform: `
                  rotateY(${cardAngle}deg)
                  translateZ(${RADIUS}px)
                `,
              }}
            >
              <div
                className={`
                  glass-card rounded-2xl p-8 h-full text-center neon-purple
                  transition-all duration-300
                  ${isFront
                    ? "opacity-100 scale-100"
                    : "opacity-20 blur-[3px] scale-90 pointer-events-none"}
                `}
                style={{
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="w-14 h-14 mx-auto mb-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {s.icon}
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white">
                  {s.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* CONTROLS */}
      <div className="absolute bottom-[-70px] flex gap-6">
        <button
          onClick={() => setRotation((r) => r + angleStep)}
          className="px-6 py-2 glass-card neon-purple"
        >
          Previous
        </button>

        <button
          onClick={() => setRotation((r) => r - angleStep)}
          className="px-6 py-2 glass-card neon-purple"
        >
          Next
        </button>
      </div>
    </div>
  );
}
