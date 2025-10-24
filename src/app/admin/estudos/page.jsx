"use client";

import { useState, useEffect } from "react";

export default function AdminEstudosPage() {
  const [estudos, setEstudos] = useState([]);
  const [form, setForm] = useState({
    title: "",
    category: "",
    resumo: "",
    content: "",
    creditos: "",
    video: "",
  });

  // 🔁 Carrega lista de estudos
  useEffect(() => {
    fetch("/api/estudos")
      .then((r) => r.json())
      .then((data) => setEstudos(data))
      .catch(() => setEstudos([]));
  }, []);

  // 🧾 Atualiza campos
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 💾 Publica estudo
  const handleSubmit = async () => {
    const res = await fetch("/api/addEstudo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("✅ Estudo publicado com sucesso!");
      setForm({
        title: "",
        category: "",
        resumo: "",
        content: "",
        creditos: "",
        video: "",
      });
      const updated = await fetch("/api/estudos").then((r) => r.json());
      setEstudos(updated);
    } else {
      alert("❌ Erro ao publicar o estudo.");
    }
  };

  // 🗑️ Excluir estudo
  const handleDelete = async (slug) => {
    if (!confirm("Deseja realmente excluir este estudo?")) return;

    const res = await fetch("/api/deleteEstudo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });

    if (res.ok) {
      const updated = await fetch("/api/estudos").then((r) => r.json());
      setEstudos(updated);
      alert("🗑️ Estudo removido!");
    } else {
      alert("❌ Erro ao excluir o estudo.");
    }
  };

  return (
    <main className="min-h-screen bg-[#e8ecf2] py-10 px-6">
      <h1 className="text-3xl font-serif text-[#0f1724] mb-8 text-center">
        ✍️ Painel — Novo Estudo
      </h1>

      {/* === FORMULÁRIO === */}
      <section className="max-w-4xl mx-auto bg-white/90 shadow-lg rounded-xl p-6 space-y-4 border border-gray-200">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Título do estudo"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Categoria (ex: Teologia Sistemática, Soteriologia...)"
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="resumo"
          value={form.resumo}
          onChange={handleChange}
          placeholder="Resumo curto"
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Conteúdo principal (HTML permitido)"
          className="w-full border px-4 py-2 rounded h-40"
        />
        <textarea
          name="creditos"
          value={form.creditos}
          onChange={handleChange}
          placeholder="Créditos (Ex: <b>Caio Modesto</b> / Curadoria: <i>Lucas Lopes</i>)"
          className="w-full border px-4 py-2 rounded h-20"
        />
        <input
          name="video"
          value={form.video}
          onChange={handleChange}
          placeholder="Link do vídeo (opcional)"
          className="w-full border px-4 py-2 rounded"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={handleSubmit}
            className="bg-[#0f1724] text-white px-6 py-2 rounded hover:bg-[#1e293b] transition"
          >
            Publicar
          </button>
        </div>
      </section>

      {/* === PRÉVIA AO VIVO === */}
      {form.title && (
        <section className="max-w-4xl mx-auto bg-[#fffaf0] border border-[#e5d8a3] rounded-2xl mt-10 shadow-inner p-8 text-[#3e3425] font-serif leading-relaxed">
          <h2 className="text-2xl font-bold text-[#2e2618] mb-2">
            {form.title}
          </h2>
          <p className="text-sm italic text-[#8b7d4a] mb-4">
            {form.category} — {new Date().toISOString().split("T")[0]}
          </p>
          <p className="mb-4">{form.resumo}</p>
          <div
            className="prose max-w-none mb-4"
            dangerouslySetInnerHTML={{ __html: form.content }}
          />
          {form.creditos && (
            <div
              className="mt-6 border-l-4 border-amber-500 bg-amber-100/70 p-3 rounded"
              dangerouslySetInnerHTML={{
                __html: `<strong>📜 Créditos:</strong> ${form.creditos}`,
              }}
            />
          )}
        </section>
      )}

      {/* === LISTA DE ESTUDOS === */}
      <section className="max-w-4xl mx-auto mt-12">
        <h2 className="text-xl font-serif text-[#0f1724] mb-4">
          📚 Estudos Publicados
        </h2>
        {estudos.length === 0 ? (
          <p className="text-gray-600 italic">
            Nenhum estudo publicado ainda.
          </p>
        ) : (
          <div className="space-y-3">
            {estudos.map((e) => (
              <div
                key={e.slug}
                className="bg-[#fff9e6] border border-[#e5d8a3] p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold text-[#2e2618]">{e.title}</h3>
                  <p className="text-sm italic text-[#7b6d4d]">
                    {e.category} — {e.date}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`/estudos/${e.slug}`}
                    target="_blank"
                    className="bg-amber-500 text-white px-4 py-1 rounded hover:bg-amber-600 transition"
                  >
                    Visualizar
                  </a>
                  <button
                    onClick={() => handleDelete(e.slug)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
