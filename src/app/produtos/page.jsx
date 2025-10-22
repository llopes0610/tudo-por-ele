"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import { useState } from "react";

export default function ProdutosPage() {
  // Exemplo inicial: você pode adicionar links da Shopee aqui.
  const [produtos] = useState([
    {
      id: 1,
      nome: "Bíblia de Estudo Reformada",
      descricao: "Edição com notas teológicas e comentários reformados.",
      preco: "R$ 189,90",
      imagem: "https://down-br.img.susercontent.com/file/sg-11134201-23020-b9d4h7k5mlmv60",
      link: "https://shopee.com.br/product/123456789/987654321", // substitua pelo seu link real
    },
    {
      id: 2,
      nome: "Camiseta Tudo Por Ele",
      descricao: "Camiseta cristã com design reformado exclusivo.",
      preco: "R$ 79,90",
      imagem: "https://down-br.img.susercontent.com/file/sg-11134201-23020-9a8kpl23lmnv60",
      link: "https://shopee.com.br/product/987654321/123456789",
    },
  ]);

  return (
    <main className="bg-[#f8fafc] min-h-screen">
      {/* === HERO === */}
      <HeroSection
        titulo="Produtos"
        subtitulo="Indicações e materiais que edificam sua fé."
        versiculo="1 Coríntios 10:31"
      />

      {/* === LISTA DE PRODUTOS === */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl font-serif font-semibold text-[#0f1724] text-center mb-10"
        >
          Recomendações e Indicações
        </motion.h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {produtos.map((produto, index) => (
            <motion.div
              key={produto.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              }}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="w-full h-56 overflow-hidden rounded-t-2xl">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold font-serif text-[#0f1724] mb-1">
                  {produto.nome}
                </h3>
                <p className="text-gray-600 text-sm mb-3 flex-grow">
                  {produto.descricao}
                </p>
                <p className="text-amber-600 font-semibold text-lg mb-4">
                  {produto.preco}
                </p>
                <a
                  href={produto.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-center bg-[#0f1724] text-white py-2 rounded-md hover:bg-[#1e293b] transition-colors duration-300"
                >
                  Ver Produto
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-gray-500 text-center text-sm mt-10">
          * Os links redirecionam para a Shopee ou parceiros oficiais.  
          Parte das indicações pode gerar apoio ao projeto “Tudo Por Ele”.
        </p>
      </section>
    </main>
  );
}
