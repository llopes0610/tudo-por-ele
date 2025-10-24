"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AdminEstudosPage() {
  const [estudo, setEstudo] = useState({
    title: "",
    category: "",
    excerpt: "",
    content: "",
    video: "",
  });

  const [preview, setPreview] = useState({});
  const [status, setStatus] = useState("");

  // Atualiza preview ao digitar
  useEffect(() => {
    const slug = estudo.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");
    setPreview({
      ...estudo,
      slug,
      date: new Date().toISOString().split("T")[0],
    });
  }, [estudo]);

  const handleChange = (e) => {
    setEstudo({ ...estudo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("⏳ Publicando...");

    const res = await fetch("/api/addEstudo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(preview),
    });

    if (res.ok) {
      setStatus("✅ Estudo publicado com sucesso!");
      setEstudo({ title: "", category: "", excerpt: "", content: "", video: "" });
    } else {
      setStatus("❌ Erro ao salvar o estudo.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] py-10 px-6">
      <h1 className="text-3xl font-serif text-center mb-10 text-[#0f1724]">
        📖 Painel Administrativo – Estudos
      </h1>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* === FORMULÁRIO === */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 space-y-5"
        >
          <h2 className="text-xl font-semibold text-[#0f1724] mb-4">
            ➕ Novo Estudo
          </h2>

          <input
            name="title"
            value={estudo.title}
            onChange={handleChange}
            placeholder="Título do Estudo"
            className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-amber-400"
            required
          />

          <input
            name="category"
            value={estudo.category}
            onChange={handleChange}
            placeholder="Categoria (ex: Soteriologia, Doutrina...)"
            className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-amber-400"
          />

          <textarea
            name="excerpt"
            value={estudo.excerpt}
            onChange={handleChange}
            placeholder="Resumo do estudo"
            rows={2}
            className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-amber-400"
          />

          <textarea
            name="content"
            value={estudo.content}
            onChange={handleChange}
            placeholder="Conteúdo em HTML (pode incluir <p>, <strong>, <em>...)"
            rows={10}
            className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-amber-400"
            required
          />

          <input
            name="video"
            value={estudo.video}
            onChange={handleChange}
            placeholder="Link opcional do vídeo (YouTube)"
            className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-amber-400"
          />

          <button
            type="submit"
            className="w-full bg-[#0f1724] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#1e293b] transition-colors duration-300"
          >
            Publicar Estudo
          </button>

          {status && (
            <p className="text-center mt-3 text-sm text-gray-600">{status}</p>
          )}
        </form>

        {/* === PREVIEW === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#fffdf5] border border-[#f5e6b3] rounded-2xl p-8 shadow-md"
        >
          <h2 className="text-xl font-serif font-semibold text-[#0f1724] mb-3">
            Prévia do Estudo
          </h2>
          <p className="text-2xl font-semibold text-[#0f1724] mb-2">
            {preview.title || "Título do Estudo"}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            {preview.date || "AAAA-MM-DD"} — {preview.category || "Categoria"}
          </p>
          <p className="text-gray-700 mb-4 italic">
            {preview.excerpt || "Resumo do conteúdo aparecerá aqui..."}
          </p>
          <div
            className="prose prose-sm max-w-none text-gray-800"
            dangerouslySetInnerHTML={{
              __html:
                preview.content ||
                "<p>O conteúdo em HTML será renderizado aqui...</p>",
            }}
          />
          {preview.video && (
            <div className="mt-4">
              <iframe
                width="100%"
                height="200"
                src={preview.video.replace("watch?v=", "embed/")}
                title="Video preview"
                className="rounded-lg shadow-md"
              />
            </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
