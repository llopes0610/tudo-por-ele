"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection({ titulo, subtitulo, versiculo }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="relative w-full h-[60vh] md:h-[55vh] overflow-hidden flex items-center justify-center text-center"
    >
      {/* Fundo com parallax */}
      <motion.div
        style={{ y, backgroundImage: "url('/hero.jpg')" }}
        className="absolute inset-0 bg-cover bg-center"
      />

      {/* Camada escura + gradiente */}
      <div className="absolute inset-0 bg-[#0f1724]/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1724]/55 to-[#0f1724]/85" />

      {/* Texto */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="relative z-10 px-6"
      >
        <div className="inline-block rounded-2xl bg-black/35 backdrop-blur-[2px] px-6 py-4 ring-1 ring-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.55)]">
          <h1 className="text-5xl md:text-7xl font-serif font-bold !text-gray-200 drop-shadow-[0_3px_8px_rgba(255,215,0,0.3)] tracking-wide">
            {titulo}
          </h1>

          {subtitulo && (
            <p className="mt-4 text-lg md:text-xl italic text-yellow-200 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_4px_rgba(255,215,0,0.3)]">
              {subtitulo}
            </p>
          )}

          {versiculo && (
            <p className="text-sm mt-3 text-amber-300 font-medium drop-shadow-[0_1px_3px_rgba(255,215,0,0.3)]">
              {versiculo}
            </p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
