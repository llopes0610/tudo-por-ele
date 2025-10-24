"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import estudos from "@/data/estudos.json";

export default function EstudoPage({ params }) {
  const estudo = estudos.find((e) => e.slug === params.slug);

  if (!estudo) return notFound();

  return (
    <main className="bg-[#f8fafc] min-h-screen">
      {/* === HERO === */}
      <section className="relative w-full h-[55vh] md:h-[50vh] flex items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-[#0f1724]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1724]/60 to-[#0f1724]/90" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative z-10 px-6"
        >
          <div className="inline-block rounded-2xl bg-black/30 backdrop-blur-[2px] px-8 py-5 ring-1 ring-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <h1 className="text-3xl md:text-5xl font-serif font-bold !text-gray-200 tracking-wide drop-shadow-[0_3px_8px_rgba(255,215,0,0.35)]">
              {estudo.title}
            </h1>
            <p className="mt-3 text-sm md:text-lg italic text-yellow-200 drop-shadow-[0_1px_4px_rgba(255,215,0,0.3)]">
              {estudo.category} — {estudo.date}
            </p>
          </div>
        </motion.div>
      </section>

      {/* === CONTEÚDO === */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-[#fffdf5] rounded-2xl shadow-lg p-8 mt-16 mb-12 leading-relaxed border border-[#f5e6b3]"
      >
        {/* Corpo principal */}
        <div
          className="prose prose-lg max-w-none text-gray-800 prose-headings:text-[#0f1724] space-y-4"
          dangerouslySetInnerHTML={{ __html: estudo.content }}
        />

        {/* Vídeo embutido */}
        {estudo.video && (
          <div className="mt-10 text-center">
            <p className="font-serif italic mb-3 text-[#0f1724]">
              🎥 Assista ao vídeo completo:
            </p>
            <iframe
              className="w-full max-w-3xl aspect-video mx-auto rounded-xl shadow-lg"
              src={estudo.video
                .replace("watch?v=", "embed/")
                .replace("&t=", "?start=")}
              title={estudo.title}
              allowFullScreen
            />
          </div>
        )}

        {/* Créditos e fontes */}
        {estudo.creditos && (
  <div className="mt-8 bg-[#fff8e1] text-[#4a3f2c] border border-[#e0c98d] rounded-xl p-5 max-w-3xl mx-auto shadow-inner">
    <p className="font-serif text-sm leading-relaxed mb-2">
      🪶 <strong>Créditos e fontes:</strong>
    </p>
    <div
      className="prose prose-sm max-w-none text-[#4a3f2c]"
      dangerouslySetInnerHTML={{ __html: estudo.creditos }}
    />
  </div>
)}

        {/* Botão de voltar */}
        <div className="text-center mt-10">
          <Link
            href="/estudos"
            className="inline-block bg-[#0f1724] text-white px-6 py-2 rounded-md hover:bg-[#1e293b] transition-all duration-300 text-sm"
          >
            ⬅️ Voltar aos Estudos
          </Link>
        </div>
      </motion.article>
    </main>
  );
}
