"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import studies from "@/data/estudos.json";

export default function EstudosPage() {
  const [categoria, setCategoria] = useState("todos");
  const [busca, setBusca] = useState("");

  const categorias = [
    "todos",
    ...Array.from(new Set(studies.map((s) => s.category))),
  ];

  const estudosFiltrados = studies.filter((s) => {
    const matchCategoria = categoria === "todos" || s.category === categoria;
    const matchBusca =
      s.title.toLowerCase().includes(busca.toLowerCase()) ||
      s.excerpt.toLowerCase().includes(busca.toLowerCase()) ||
      s.category.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

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
            <h1 className="text-4xl md:text-6xl font-serif font-bold !text-gray-200 tracking-wide drop-shadow-[0_3px_8px_rgba(255,215,0,0.35)]">
              Estudos Bíblicos
            </h1>
            <p className="mt-3 text-lg italic text-yellow-200 drop-shadow-[0_1px_4px_rgba(255,215,0,0.3)]">
              Doutrina, graça e verdade à luz das Escrituras.
            </p>
          </div>
        </motion.div>
      </section>

      {/* === FILTROS E BUSCA === */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <div className="mb-10">
          <input
            type="text"
            placeholder="Pesquisar estudos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full md:w-2/3 px-5 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                categoria === cat
                  ? "bg-[#0f1724] text-yellow-400 shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* === LISTA DE ESTUDOS === */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
          transition={{ duration: 0.4 }}
        >
          <AnimatePresence>
            {estudosFiltrados.length > 0 ? (
              estudosFiltrados.map((s, index) => (
                <motion.article
                  key={s.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-gray-200 hover:-translate-y-1"
                >
                  <div>
                    <h3 className="text-xl font-semibold font-serif text-[#0f1724] mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">
                      {s.date} — {s.category}
                    </p>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {s.excerpt}
                    </p>
                  </div>
                  <Link
                    href={`/estudos/${s.slug}`}
                    className="inline-block mt-4 bg-[#0f1724] text-white px-4 py-2 rounded-md hover:bg-[#1e293b] transition-all duration-300 text-sm font-medium"
                  >
                    Ler Estudo
                  </Link>
                </motion.article>
              ))
            ) : (
              <p className="text-gray-500 text-lg col-span-full">
                Nenhum estudo encontrado.
              </p>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}
