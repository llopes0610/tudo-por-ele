"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const toSlug = (title) =>
  (title || "")
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export default function AdminEstudosPage() {
  const [estudos, setEstudos] = useState([]);
  const [status, setStatus] = useState("");
  const [mode, setMode] = useState("create"); // "create" | "edit"
  const [originalSlug, setOriginalSlug] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    excerpt: "",
    content: "",
    video: "",
  });

  const preview = useMemo(() => {
    const slug = toSlug(form.title);
    return {
      ...form,
      slug,
      date: new Date().toISOString().split("T")[0],
    };
  }, [form]);

  // Carrega lista
  const loadEstudos = async () => {
    const res = await fetch("/api/estudos", { cache: "no-store" });
    const data = await res.json();
    setEstudos(data || []);
  };

  useEffect(() => {
    loadEstudos();
  }, []);

  const resetForm = () => {
    setForm({ title: "", category: "", excerpt: "", content: "", video: "" });
    setMode("create");
    setOriginalSlug(null);
    setStatus("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("⏳ Salvando...");

    try {
      const endpoint =
        mode === "create" ? "/api/addEstudo" : "/api/updateEstudo";
      const body =
        mode === "create"
          ? preview
          : { originalSlug, ...preview }; // inclui o slug antigo para localizar

      const res = await fetch(endpoint, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Falha ao salvar");
      }

      await loadEstudos();
      setStatus("✅ Estudo salvo com sucesso!");
      resetForm();
    } catch (err) {
      console.error(err);
      setStatus("❌ " + err.message);
    }
  };

  const startEdit = (item) => {
    setMode("edit");
    setOriginalSlug(item.slug);
    setForm({
      title: item.title,
      category: item.category || "",
      excerpt: item.excerpt || "",
      content: item.content || "",
      video: item.video || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteItem = async (slug) => {
    if (!confirm("Tem certeza que deseja excluir este estudo?")) return;
    setStatus("⏳ Excluindo...");

    try {
      const res = await fetch("/api/deleteEstudo", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Falha ao excluir");
      }
      await loadEstudos();
      setStatus("✅ Estudo excluído.");
      if (mode === "edit" && originalSlug === slug) resetForm();
    } catch (err) {
      console.error(err);
      setStatus("❌ " + err.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] py-10 px-6">
      <h1 className="text-3xl font-serif text-center mb-10 text-[#0f1724]">
        📖 Painel Administrativo — Estudos
      </h1>

      {/* FORM + PREVIEW */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* === FORMULÁRIO === */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 space-y-5"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#0f1724]">
              {mode === "create" ? "➕ Novo Estudo" : "✏️ Editar Estudo"}
            </h2>
            {mode === "edit" && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm text-gray-600 hover:underline"
              >
                cancelar edição
              </button>
            )}
          </div>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Título do Estudo"
            className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-amber-400"
            required
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Categoria (ex: Soteriologia, Doutrina...)"
            className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-amber-400"
          />

          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            placeholder="Resumo do estudo"
            rows={2}
            className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-amber-400"
          />

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Conteúdo em HTML (pode incluir <p>, <strong>, <em>...)"
            rows={10}
            className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-amber-400 font-mono"
            required
          />

          <input
            name="video"
            value={form.video}
            onChange={handleChange}
            placeholder="Link opcional do YouTube (watch?v=...)"
            className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-amber-400"
          />

          {/* slug calculado */}
          <p className="text-xs text-gray-500">
            <strong>Slug:</strong> {preview.slug || "(gerado automaticamente)"}
          </p>

          <button
            type="submit"
            className="w-full bg-[#0f1724] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#1e293b] transition-colors duration-300"
          >
            {mode === "create" ? "Publicar Estudo" : "Salvar Alterações"}
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
            Prévia
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

          {!!preview.video && (
            <div className="mt-4">
              <iframe
                width="100%"
                height="220"
                src={preview.video.replace("watch?v=", "embed/")}
                title="Video preview"
                className="rounded-lg shadow-md"
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* LISTA DE ESTUDOS */}
      <section className="max-w-6xl mx-auto mt-12">
        <h3 className="text-xl font-semibold text-[#0f1724] mb-4">
          Estudos cadastrados
        </h3>

        {estudos.length === 0 ? (
          <p className="text-gray-500">Nenhum estudo cadastrado ainda.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {estudos.map((item) => (
              <div
                key={item.slug}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col"
              >
                <div className="flex-1">
                  <p className="font-semibold text-[#0f1724]">{item.title}</p>
                  <p className="text-xs text-gray-500">
                    {item.date} • {item.category || "Sem categoria"}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                    {item.excerpt}
                  </p>
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => startEdit(item)}
                    className="px-3 py-2 text-sm rounded bg-amber-500 text-white hover:bg-amber-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteItem(item.slug)}
                    className="px-3 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    Excluir
                  </button>
                  <a
                    href={`/estudos/${item.slug}`}
                    target="_blank"
                    className="ml-auto px-3 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Ver no site ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
