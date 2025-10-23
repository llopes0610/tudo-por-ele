"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";

const produtos = [
  {
    id: 1,
    nome: "Bíblia De Estudo | NAA | Letra Normal | Tamanho Portátil",
    imagem:
      "https://down-br.img.susercontent.com/file/sg-11134201-7rbm3-m5soxau97f1a05.webp",
    link: "https://shopee.com.br/B%C3%ADblia-De-Estudo-Naa-Letra-Normal-Tamanho-Port%C3%A1til-i.400905650.22498188373?sp_atk=249c5ade-5ff2-4205-b2bc-550036f9c080&xptdk=249c5ade-5ff2-4205-b2bc-550036f9c080",
    descricao:
      "Uma excelente Bíblia de estudo na tradução NAA — perfeita para o dia a dia, com tamanho portátil e leitura confortável.",
  },
  {
    id: 2,
    nome: "Panorama da História Cristã | Hernandes Dias Lopes | Hagnos",
    imagem:
      "https://down-br.img.susercontent.com/file/sg-11134201-7rd4g-luqmx6bil3cpf6@resize_w450_nl.webp",
    link: "https://shopee.com.br/Panorama-da-Historia-Crist%C3%A3-Hernandes-Dias-Lopes-Hagnos-i.217167158.22797485525?sp_atk=2c3c1970-888b-45a0-8544-0a00396ae02c&xptdk=2c3c1970-888b-45a0-8544-0a00396ae02c",
    descricao:
      "Uma obra essencial que apresenta a trajetória da igreja cristã sob uma ótica bíblica e reformada, escrita por Hernandes Dias Lopes.",
  },
];

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
