"use client";

import { motion } from "framer-motion";

export default function HeroSection({ titulo, subtitulo, versiculo }) {
  return (
    <section className="relative w-full h-[55vh] md:h-[50vh] flex items-center justify-center text-center overflow-hidden">
      {/* 🔹 Imagem de fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      ></div>

      {/* 🔹 Camadas para contraste */}
      <div className="absolute inset-0 bg-[#0f1724]/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1724]/60 to-[#0f1724]/90" />

      {/* 🔹 Conteúdo com animação e destaque */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="relative z-10 px-6"
      >
        <div className="inline-block rounded-2xl bg-black/30 backdrop-blur-[2px] px-8 py-5 ring-1 ring-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <h1 className="text-4xl md:text-6xl font-serif font-bold !text-gray-200 tracking-wide drop-shadow-[0_3px_8px_rgba(255,215,0,0.35)]">
            {titulo}
          </h1>

          {subtitulo && (
            <p className="mt-3 text-lg md:text-xl italic text-yellow-200 leading-relaxed drop-shadow-[0_1px_4px_rgba(255,215,0,0.3)]">
              {subtitulo}
            </p>
          )}

          {versiculo && (
            <p className="mt-2 text-sm text-amber-300 font-medium drop-shadow-[0_1px_3px_rgba(255,215,0,0.3)]">
              {versiculo}
            </p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
