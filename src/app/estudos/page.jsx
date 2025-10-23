"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import studies from "@/data/estudos.json";

export default function EstudosPage() {
  const [query, setQuery] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");

  const categorias = ["Todas", ...new Set(studies.map((s) => s.category))];

  const estudosFiltrados = studies.filter((s) => {
    const texto = `${s.title} ${s.excerpt} ${s.category}`.toLowerCase();
    const pesquisa = query.toLowerCase();
    const categoriaOk =
      categoriaSelecionada === "Todas" || s.category === categoriaSelecionada;
    return texto.includes(pesquisa) && categoriaOk;
  });

  return (
    <main className="bg-[#f8fafc] min-h-screen">
      {/* === HERO === */}
      <section className="relative w-full h-[55vh] flex items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#0f1724]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1724]/55 to-[#0f1724]/85" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-10 px-6"
        >
          <div className="inline-block rounded-2xl bg-black/35 backdrop-blur-[2px] px-6 py-4 ring-1 ring-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.55)]">
           <h1
  className="text-5xl md:text-6xl font-serif font-bold text-gray-50"
  style={{
    color: "#f8f9fa", // cinza claro quase branco
    textShadow: "0 3px 10px rgba(0,0,0,0.8)", // contorno sutil
  }}
>
  Estudos
</h1>
            <p className="mt-3 text-base md:text-lg italic text-yellow-100">
              Aprofunde-se nas doutrinas da graça e na verdade das Escrituras.
            </p>
            <p className="text-sm text-amber-300 mt-2">2 Timóteo 3:16</p>
          </div>
        </motion.div>
      </section>

      {/* === FILTROS === */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          {/* Campo de busca */}
          <input
            type="text"
            placeholder="🔍 Buscar estudo..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0f1724]"
          />

          {/* Filtros por categoria */}
          <div className="flex flex-wrap justify-center gap-2">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaSelecionada(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  categoriaSelecionada === cat
                    ? "bg-[#0f1724] text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* === LISTA DE ESTUDOS === */}
        {estudosFiltrados.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {estudosFiltrados.map((estudo, index) => (
              <motion.article
                key={estudo.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-200"
              >
                <h4 className="text-xl font-semibold text-[#0f1724] mb-2">
                  {estudo.title}
                </h4>
                <p className="text-sm text-gray-500 mb-3">
                  {new Date(estudo.date).toLocaleDateString("pt-BR")}
                </p>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {estudo.excerpt}
                </p>
                <Link
                  href={`/estudos/${estudo.slug}`}
                  className="inline-block mt-auto px-4 py-2 text-sm font-medium text-white bg-[#0f1724] hover:bg-[#1e293b] rounded-md transition-colors duration-300"
                >
                  Ler Mais
                </Link>
              </motion.article>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 italic mt-16">
            Nenhum estudo encontrado. Tente outro termo ou categoria.
          </p>
        )}
      </section>
    </main>
  );
}
