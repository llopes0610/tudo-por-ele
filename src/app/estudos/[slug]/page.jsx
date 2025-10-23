"use client";

import studies from "@/data/estudos.json";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function EstudoPage({ params }) {
  const estudo = studies.find((s) => s.slug === params.slug);
  if (!estudo) return notFound();

  return (
    <main className="bg-[#f8fafc] min-h-screen pb-20">
      {/* === HERO === */}
      <section className="relative w-full h-[50vh] flex items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#0f1724]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1724]/55 to-[#0f1724]/85" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 px-6"
        >
          <div className="inline-block rounded-2xl bg-black/40 backdrop-blur-[2px] px-6 py-4 ring-1 ring-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.55)]">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-100">
              {estudo.title}
            </h1>
            <p className="mt-3 text-base md:text-lg italic text-gray-200">
              {estudo.category}
            </p>
          </div>
        </motion.div>
      </section>

      {/* === ARTIGO === */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        {/* Data e categoria */}
        <div className="text-center mb-10">
          <p className="text-sm text-gray-500">
            Publicado em{" "}
            <span className="font-medium text-[#0f1724]">
              {new Date(estudo.date).toLocaleDateString("pt-BR")}
            </span>
          </p>
          <div className="w-16 h-[2px] bg-[#0f1724] mx-auto mt-3"></div>
        </div>

        {/* Conteúdo principal */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-[#0f1724] prose-p:text-gray-800 prose-strong:text-[#0f1724] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: estudo.content }}
        />

        {/* BLOCO DO AUTOR */}
        <div className="mt-16 border-t border-gray-300 pt-8 text-center">
          <div className="flex flex-col items-center">
            <img
              src="/autor.jpg"
              alt="Autor"
              className="w-20 h-20 rounded-full border-4 border-[#0f1724]/20 shadow-md mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold text-[#0f1724]">
              Lucas Lopes
            </h3>
            <p className="text-gray-600 text-sm mt-1 italic max-w-md">
              Teólogo reformado, estudante das Escrituras e defensor da fé
              cristã bíblica conforme as doutrinas da graça.
            </p>
          </div>
        </div>

        {/* Botão Voltar */}
        <div className="mt-12 text-center">
          <Link
            href="/estudos"
            className="inline-block bg-[#0f1724] text-white px-6 py-2 rounded-md hover:bg-[#1e293b] transition-all duration-300"
          >
            ← Voltar aos Estudos
          </Link>
        </div>
      </section>
    </main>
  );
}
