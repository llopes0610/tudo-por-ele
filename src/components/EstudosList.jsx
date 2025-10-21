"use client";
import { useState } from "react";
import Link from "next/link";
import studies from "../data/estudos.json";

export default function EstudosList() {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("todos");

  // Defina suas categorias
  const categorias = ["todos", "Doutrina", "História", "Sola Scriptura"];

  const filtered = studies.filter((s) => {
    const matchCat = categoria === "todos" || s.category === categoria;
    const matchQuery =
      s.title.toLowerCase().includes(query.toLowerCase()) ||
      s.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="max-w-5xl mx-auto">
      {/* campo de busca */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar estudos..."
        className="w-full p-3 rounded border border-gray-300 mb-6"
      />

      {/* filtro por categoria */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`px-4 py-2 rounded-full border text-sm ${
              categoria === cat
                ? "bg-[#0f1724] text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* lista de estudos */}
      <div className="grid gap-6">
        {filtered.map((s) => (
          <article
            key={s.slug}
            className="bg-white p-6 rounded shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{s.title}</h3>
            <p className="text-sm text-[#8aa2b8]">{s.date}</p>
            <p className="mt-3 text-gray-600">{s.excerpt}</p>
            <Link
              href={`/estudos/${s.slug}`}
              className="inline-block mt-4 bg-[#0f1724] text-white px-4 py-2 rounded"
            >
              Ler Completo
            </Link>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          Nenhum estudo encontrado.
        </p>
      )}
    </div>
  );
}
