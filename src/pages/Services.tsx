import { motion } from "framer-motion";
import {
  Monitor,
  Palette,
  Smartphone,
  Zap,
  Database,
  Cloud,
} from "lucide-react";
import MagicBento from "@/components/MagicBento";

export default function Services() {
  const services = [
    {
      icon: <Monitor />,
      title: "Web Development",
      description: "High-performance React & modern web applications.",
    },
    {
      icon: <Palette />,
      title: "Brand Identity",
      description: "Futuristic visual systems and digital branding.",
    },
    {
      icon: <Smartphone />,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile solutions.",
    },
    {
      icon: <Zap />,
      title: "Automation",
      description: "AI-powered workflow optimization and tooling.",
    },
    {
      icon: <Database />,
      title: "Backend Systems",
      description: "Scalable, secure server-side architectures.",
    },
    {
      icon: <Cloud />,
      title: "Cloud DevOps",
      description: "AWS, Azure, and modern cloud infrastructure.",
    },
  ];

  return (
    <section className="min-h-screen bg-background pt-32 pb-24 px-6">
      <div className="container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-orbitron font-bold text-white mb-20 text-center"
        >
          Our <span className="gradient-text">Services</span>
        </motion.h1>

        <MagicBento
          cards={services}
          enableSpotlight
          enableBorderGlow
          enableTilt
          enableMagnetism={false}
          clickEffect
          glowColor="132, 0, 255"
        />
      </div>
    </section>
  );
}
