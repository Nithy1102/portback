import { useRef, useEffect, useCallback, useState } from "react";
import { gsap } from "gsap";

const DEFAULT_SPOTLIGHT_RADIUS = 260;
const DEFAULT_GLOW_COLOR = "132, 0, 255";
const MOBILE_BREAKPOINT = 768;

type MagicCard = {
  icon?: React.ReactNode;
  title: string;
  description: string;
};

type MagicBentoProps = {
  cards: MagicCard[];
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  glowColor?: string;
  spotlightRadius?: number;
  disableAnimations?: boolean;
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
};

export default function MagicBento({
  cards,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism = false,
  clickEffect = true,
  glowColor = DEFAULT_GLOW_COLOR,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  disableAnimations = false,
}: MagicBentoProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMobileDetection();
  const shouldDisable = disableAnimations || isMobile;

  /* ---------------- SPOTLIGHT ---------------- */
  useEffect(() => {
    if (!enableSpotlight || shouldDisable || !gridRef.current) return;

    const spotlight = document.createElement("div");
    spotlight.style.cssText = `
      position: fixed;
      width: 700px;
      height: 700px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor},0.18) 0%,
        rgba(${glowColor},0.08) 25%,
        transparent 65%
      );
      mix-blend-mode: screen;
      opacity: 0;
      transform: translate(-50%, -50%);
      z-index: 30;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const onMove = (e: MouseEvent) => {
      const rect = gridRef.current!.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      gsap.to(spotlight, {
        opacity: inside ? 0.8 : 0,
        duration: inside ? 0.2 : 0.4,
      });

      if (inside) {
        gsap.to(spotlight, {
          left: e.clientX,
          top: e.clientY,
          duration: 0.15,
          ease: "power2.out",
        });
      }

      gridRef.current!
        .querySelectorAll(".magic-card")
        .forEach((card) => {
          const r = card.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
          const intensity = Math.max(0, 1 - dist / spotlightRadius);
          card.style.setProperty("--glow", intensity.toString());
        });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      spotlight.remove();
    };
  }, [enableSpotlight, glowColor, spotlightRadius, shouldDisable]);

  /* ---------------- CARD INTERACTION ---------------- */
  const attachCardEvents = useCallback(
    (el: HTMLDivElement) => {
      if (!el || shouldDisable) return;

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;

        if (enableTilt) {
          gsap.to(el, {
            rotateX: (-y / r.height) * 8,
            rotateY: (x / r.width) * 8,
            duration: 0.2,
          });
        }

        if (enableMagnetism) {
          gsap.to(el, {
            x: x * 0.05,
            y: y * 0.05,
            duration: 0.3,
          });
        }
      };

      const onLeave = () => {
        gsap.to(el, {
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
          duration: 0.4,
        });
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
    },
    [shouldDisable, enableTilt, enableMagnetism]
  );

  return (
    <div
      ref={gridRef}
      className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-10"
    >
      {cards.map((card, i) => (
        <div
          key={i}
          ref={attachCardEvents}
          className={`magic-card glass-card p-8 rounded-xl relative transition-all
            ${enableBorderGlow ? "border border-white/5" : ""}`}
          style={{
            ["--glow-color" as any]: glowColor,
          }}
        >
          {card.icon && (
            <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
              {card.icon}
            </div>
          )}

          <h3 className="text-2xl font-orbitron font-bold text-white mb-4">
            {card.title}
          </h3>

          <p className="text-gray-400 font-rajdhani leading-relaxed">
            {card.description}
          </p>

          {/* glow overlay */}
          <div className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: `radial-gradient(
                300px at center,
                rgba(${glowColor}, calc(var(--glow, 0) * 0.35)),
                transparent 70%
              )`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
