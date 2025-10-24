"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import produtos from "@/data/produtos.json"; // ✅ Agora lê do JSON

export default function ProdutosPage() {
  return (
    <main className="bg-[#f8fafc] min-h-screen">
      {/* === HERO === */}
      <HeroSection
        titulo="Produtos Recomendados"
        subtitulo="Recursos que edificam sua fé e fortalecem seu estudo bíblico."
        versiculo="Provérbios 4:7"
      />

      {/* === LISTAGEM DE PRODUTOS === */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl font-serif font-semibold text-center text-[#0f1724] mb-10"
        >
          Itens Recomendados
        </motion.h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {produtos.map((produto, index) => (
            <motion.div
              key={produto.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 flex flex-col"
            >
              <div className="w-full h-64 bg-gray-50 overflow-hidden flex items-center justify-center">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="object-contain w-full h-full"
                />
              </div>

              <div className="p-6 flex flex-col justify-between flex-1">
                <h3 className="text-lg font-semibold text-[#0f1724] mb-3 text-center leading-snug">
                  {produto.nome}
                </h3>
                <p className="text-gray-600 text-sm mb-6 text-center">
                  {produto.descricao}
                </p>
                <Link
                  href={produto.link}
                  target="_blank"
                  className="inline-block mt-auto bg-[#0f1724] text-white font-medium px-5 py-3 rounded-lg text-center hover:bg-[#1e293b] transition-colors duration-300"
                >
                  Ver na Shopee 🛒
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
