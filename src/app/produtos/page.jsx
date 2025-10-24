"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";

const produtos = [
  {
    id: 1,
    nome: "Bíblia De Estudo | NAA | Letra Normal | Tamanho Portátil",
    imagem: "https://down-br.img.susercontent.com/file/sg-11134201-7rbm3-m5soxau97f1a05.webp",
    link: "https://s.shopee.com.br/50QhWri6ZN?aff_id=SEU_ID",
    categoria: "Bíblias",
    descricao:
      "Uma excelente Bíblia de estudo na tradução NAA — perfeita para o dia a dia, com tamanho portátil e leitura confortável.",
  },
  {
    id: 2,
    nome: "Panorama da História Cristã | Hernandes Dias Lopes | Hagnos",
    imagem: "https://down-br.img.susercontent.com/file/sg-11134201-7rd4g-luqmx6bil3cpf6@resize_w450_nl.webp",
    link: "https://s.shopee.com.br/7pksu1cvkS?aff_id=SEU_ID",
    categoria: "Livros",
    descricao:
      "Uma obra essencial que apresenta a trajetória da igreja cristã sob uma ótica bíblica e reformada, escrita por Hernandes Dias Lopes.",
  },
  {
    id: 3,
    nome: "Panorama Completo de A a Z — Antigo e Novo Testamento",
    imagem: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-mcjr1zinopoha1.webp",
    link: "https://s.shopee.com.br/qb8ZK8PKe?aff_id=SEU_ID",
    categoria: "Estudos Visuais",
    descricao:
      "Descubra a Bíblia de forma mais clara e didática com este panorama impresso, colorido e encadernado — ideal para estudos sistemáticos e visuais das Escrituras.",
  },
];

export default function ProdutosPage() {
  const [categoria, setCategoria] = useState("Todos");

  const categorias = ["Todos", "Bíblias", "Livros", "Estudos Visuais"];

  const produtosFiltrados =
    categoria === "Todos"
      ? produtos
      : produtos.filter((p) => p.categoria === categoria);

  return (
    <main className="bg-[#f8fafc] min-h-screen">
      {/* === HERO === */}
      <HeroSection
        titulo="Produtos Recomendados"
        subtitulo="Recursos que edificam sua fé e fortalecem seu estudo bíblico."
        versiculo="Provérbios 4:7"
      />

      {/* === FILTROS === */}
      <section className="max-w-6xl mx-auto px-6 py-10 text-center">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
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
              {cat}
            </button>
          ))}
        </div>

        {/* === LISTAGEM === */}
        <motion.div
          layout
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none scrollbar-hide"
        >
          <AnimatePresence>
            {produtosFiltrados.map((produto, index) => (
              <motion.div
                key={produto.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl border border-gray-200 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 snap-center w-full sm:w-auto"
              >
                <div className="w-full h-64 bg-gray-50 flex items-center justify-center overflow-hidden relative">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <h3 className="text-lg font-semibold font-serif text-[#0f1724] mb-3 text-center leading-snug group-hover:text-amber-600 transition-colors">
                    {produto.nome}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6 text-center leading-relaxed">
                    {produto.descricao}
                  </p>
                  <Link
                    href={produto.link}
                    target="_blank"
                    className="inline-block mt-auto bg-gradient-to-r from-[#0f1724] to-[#1e293b] text-white font-medium px-5 py-3 rounded-lg text-center hover:from-amber-600 hover:to-yellow-500 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    🛍️ Ver na Shopee
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}
