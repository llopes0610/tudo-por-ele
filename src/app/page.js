"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import studies from "../data/estudos.json";

export default function Home() {
  const recent = studies.slice(0, 3);

  return (
    <section className="bg-[#f3f5f8] py-16">
      {/* Título da seção */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl font-serif font-bold text-center text-[#0f1724] mb-10"
      >
        Estudos Recentes
      </motion.h2>

      {/* Grid moderna */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        {recent.map((s, i) => (
          <motion.article
            key={s.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#0f1724] group-hover:text-[#1e3a8a] transition-colors">
                {s.title}
              </h3>
              <p className="text-sm text-[#8aa2b8] mt-1">{s.date}</p>
              <p className="mt-3 text-gray-600 line-clamp-3">{s.excerpt}</p>

              <Link
                href={`/estudos/${s.slug}`}
                className="inline-block mt-5 bg-[#0f1724] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1e3a8a] transition-colors"
              >
                Ler Mais
              </Link>
            </div>

            {/* Efeito visual na borda inferior */}
            <div className="h-1 bg-gradient-to-r from-[#0f1724] to-[#1e3a8a] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
