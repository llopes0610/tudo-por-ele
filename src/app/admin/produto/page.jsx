"use client";

import { useState } from "react";

export default function AdminProdutoPage() {
  // Estado do formulário de produto
  const [produto, setProduto] = useState({
    nome: "",
    imagem: "",
    link: "",
    descricao: "",
    categoria: "",
  });

  // Mensagem de status
  const [status, setStatus] = useState("");

  // Atualiza valores do formulário
  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  // Envia novo produto para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("⏳ Salvando produto...");

    try {
      const res = await fetch("/api/addProduto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
      });

      if (res.ok) {
        setStatus("✅ Produto adicionado com sucesso!");
        setProduto({
          nome: "",
          imagem: "",
          link: "",
          descricao: "",
          categoria: "",
        });
      } else {
        setStatus("❌ Erro ao salvar o produto.");
      }
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      setStatus("❌ Falha na comunicação com o servidor.");
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
        <h1 className="text-3xl font-serif text-center mb-8 text-[#0f1724]">
          🛒 Painel Administrativo – Produtos
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="nome"
            value={produto.nome}
            onChange={handleChange}
            placeholder="Nome do produto"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            required
          />
          <input
            name="imagem"
            value={produto.imagem}
            onChange={handleChange}
            placeholder="URL da imagem"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            required
          />
          <input
            name="link"
            value={produto.link}
            onChange={handleChange}
            placeholder="Link da Shopee"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            required
          />
          <input
            name="categoria"
            value={produto.categoria}
            onChange={handleChange}
            placeholder="Categoria (ex: Bíblias, Livros...)"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <textarea
            name="descricao"
            value={produto.descricao}
            onChange={handleChange}
            placeholder="Descrição do produto"
            rows={4}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <button
            type="submit"
            className="w-full bg-[#0f1724] text-white font-medium px-6 py-3 rounded-lg hover:bg-[#1e293b] transition-colors duration-300"
          >
            Salvar Produto
          </button>
        </form>

        {status && (
          <p className="text-center mt-4 text-sm text-gray-600">{status}</p>
        )}
      </div>
    </main>
  );
}
