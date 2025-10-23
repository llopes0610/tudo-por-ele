"use client";

import { motion } from "framer-motion";
import studies from "@/data/estudos.json";
import HeroSection from "@/components/HeroSection";
import Link from "next/link";

export default function EstudoPage({ params }) {
  const estudo = studies.find((s) => s.slug === params.slug);

  if (!estudo) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700">
          Estudo não encontrado.
        </h2>
        <Link
          href="/estudos"
          className="mt-6 inline-block bg-[#0f1724] text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-[#1e293b] transition-all"
        >
          ← Voltar aos Estudos
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-[#f8fafc] min-h-screen">
      {/* === HERO === */}
      <HeroSection
        titulo={estudo.title}
        subtitulo={estudo.category}
        versiculo={estudo.date}
      />

      {/* === CONTEÚDO DO ESTUDO === */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 py-16">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[#fffdf5] rounded-2xl shadow-lg p-6 sm:p-10 leading-relaxed border border-[#f5e6b3]"
        >
          {/* Conteúdo principal */}
          <div
            className="prose prose-lg max-w-none text-gray-800 prose-headings:text-[#0f1724] leading-8 tracking-wide space-y-6"
            dangerouslySetInnerHTML={{ __html: estudo.content }}
          />

          {/* Linha divisória */}
          <hr className="my-8 border-t border-[#e6dba3]" />

          {/* Autor */}
          <div className="text-center text-sm text-gray-700">
            <p className="font-semibold">Autor: Lucas Silva Lopes</p>
            <p className="mt-1 text-gray-600">
              Estudante de <strong>Bacharelado em Estudos Bíblicos</strong> pela{" "}
              <strong>FitRef</strong>, teólogo reformado comprometido com a
              exaltação de Cristo e a fidelidade às Escrituras.
            </p>
          </div>

          {/* Informações finais */}
          <div className="border-t border-gray-300 mt-10 pt-6 text-sm text-gray-600 text-center">
            <p className="font-medium text-[#0f1724]">{estudo.title}</p>
            <p>
              {estudo.category} — {estudo.date}
            </p>
          </div>

          {/* Botão voltar responsivo */}
          <div className="mt-10 text-center">
            <Link
              href="/estudos"
              className="inline-flex items-center justify-center gap-2 bg-[#0f1724] text-white px-8 py-3 rounded-lg font-semibold text-sm sm:text-base shadow-lg hover:bg-[#1e293b] transition-all duration-300"
            >
              <span className="text-lg">←</span> Voltar aos Estudos
            </Link>
          </div>
        </motion.article>
      </section>
    </main>
  );
}
