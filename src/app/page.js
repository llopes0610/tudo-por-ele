"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import estudos from "@/data/estudos.json";

export default function HomePage() {
  // 🧭 Ordena sempre por data (mais novos primeiro)
  const estudosOrdenados = [...estudos].sort((a, b) => {
    const dataA = new Date(a.date).getTime();
    const dataB = new Date(b.date).getTime();
    return dataB - dataA;
  });

  return (
    <main className="bg-[#e9edf2] min-h-screen">
      {/* 🏠 HERO herdado com o mesmo estilo da página de Estudos */}
      <HeroSection
        title="Tudo Por Ele"
        subtitle="Teologia Reformada para os nossos dias"
        background="/hero.jpg"
      />

      {/* 📚 Seção de Estudos Recentes */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-serif text-center mb-10 text-[#0f1724] drop-shadow-sm">
          Estudos Recentes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {estudosOrdenados.map((estudo, index) => (
            <motion.div
              key={estudo.slug}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 border border-gray-200 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-[#0f1724] mb-2 line-clamp-2">
                {estudo.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{estudo.date}</p>
              <p className="text-gray-700 text-sm mb-4 line-clamp-4">
                {estudo.excerpt}
              </p>
              <Link
                href={`/estudos/${estudo.slug}`}
                className="inline-block bg-[#0f1724] text-white px-4 py-2 rounded-md hover:bg-[#1e293b] transition-all duration-300 text-sm"
              >
                Ler Mais
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
