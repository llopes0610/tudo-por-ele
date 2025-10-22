"use client";

import HeroSection from "@/components/HeroSection";
import { useState } from "react";

export default function ProdutosPage() {
  const [link, setLink] = useState("");
  const [produtos, setProdutos] = useState([]);

  const adicionarProduto = () => {
    if (!link) return;
    // Aqui futuramente podemos tentar integrar Shopee API.
    // Por enquanto, apenas adiciona o link.
    setProdutos([...produtos, { id: produtos.length + 1, link }]);
    setLink("");
  };

  return (
    <main>
      <HeroSection
        titulo="Produtos Recomendados"
        subtitulo="Indicações úteis e acessíveis para o seu dia a dia cristão."
        versiculo="Provérbios 16:3"
      />

      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-[#0f1724] mb-6">
          Adicionar Produto da Shopee
        </h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Cole o link do produto Shopee"
            className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={adicionarProduto}
            className="bg-[#0f1724] text-white px-4 py-2 rounded-lg hover:bg-[#1e293b] transition"
          >
            Adicionar
          </button>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="p-4 border rounded-xl shadow-sm bg-white hover:shadow-md transition"
            >
              <p className="text-sm text-gray-600 mb-2">Produto #{produto.id}</p>
              <a
                href={produto.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {produto.link}
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
