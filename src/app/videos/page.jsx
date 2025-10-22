"use client";

import HeroSection from "@/components/HeroSection";
import VideosGrid from "@/components/VideosGrid";
import { motion } from "framer-motion";

export default function VideosPage() {
  return (
    <main className="bg-[#f8fafc] min-h-screen">
      {/* === HERO === */}
      <HeroSection
        titulo="Vídeos"
        subtitulo="Ensinos reformados e exposições bíblicas em vídeo."
        versiculo="Romanos 10:17"
      />

      {/* === CONTEÚDO === */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl font-serif text-center text-[#0f1724] mb-10"
        >
          Vídeos Teológicos
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-700 text-lg text-center max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Acompanhe estudos, exposições bíblicas e reflexões teológicas
          cuidadosamente produzidas à luz da fé reformada. Nossa missão é
          edificar o corpo de Cristo e glorificar a Deus por meio da verdade.
        </motion.p>

        <VideosGrid />
      </section>
    </main>
  );
}
