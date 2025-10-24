"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function EstudoClient({ estudo }) {
  if (!estudo) return notFound();

  let imageUrl = "/logo-brasao.png";
  if (estudo.video && estudo.video.includes("youtube.com/watch?v=")) {
    const match = estudo.video.match(/v=([^&]+)/);
    if (match && match[1]) {
      imageUrl = `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
    }
  }

  return (
    <main className="bg-[#f8fafc] min-h-screen">
      <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center text-center overflow-hidden">
  <div
    className="absolute inset-0 bg-cover bg-center transition-all duration-700"
    style={{
      backgroundImage: `url('${imageUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: "center 40%",
      filter: "brightness(0.4) contrast(1.15) saturate(0.8) blur(1px)",
      transform: "scale(1.05)",
    }}
  ></div>

  {/* Camadas de overlay suaves */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#0f1724]/50 via-[#0f1724]/70 to-[#0f1724]/95 mix-blend-multiply" />
  <div className="absolute inset-0 bg-[url('/texture-paper.png')] opacity-20 mix-blend-overlay" />

  {/* Conteúdo central */}
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="relative z-10 px-8"
  >
    <div className="inline-block rounded-2xl bg-[#0f1724]/60 backdrop-blur-sm px-10 py-6 border border-[#f5e6b3]/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#fef9e6] drop-shadow-[0_3px_6px_rgba(0,0,0,0.6)]">
        {estudo.title}
      </h1>
      <p className="mt-4 text-sm md:text-lg italic text-[#f5e6b3]">
        {estudo.category} — {estudo.date}
      </p>
    </div>
  </motion.div>
</section>


      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-[#fffdf5] rounded-2xl shadow-lg p-8 mt-16 mb-12 leading-relaxed border border-[#f5e6b3]"
      >
        <div
          className="prose prose-lg max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: estudo.content }}
        />

        {estudo.video && (
          <div className="mt-8 text-center">
            <p className="font-serif italic mb-2 text-[#0f1724]">
              🎥 Assista ao vídeo completo:
            </p>
            <iframe
              className="w-full max-w-3xl aspect-video mx-auto rounded-xl shadow-lg"
              src={estudo.video
                .replace("watch?v=", "embed/")
                .replace("&t=", "?start=")}
              title={estudo.title}
              allowFullScreen
            />
          </div>
        )}

        {estudo.creditos && (
          <div className="mt-8 bg-[#fff8e1] text-[#4a3f2c] border border-[#e0c98d] rounded-xl p-5 max-w-3xl mx-auto shadow-inner">
            <p className="font-serif text-sm leading-relaxed mb-2">
              🪶 <strong>Créditos e fontes:</strong>
            </p>
            <div
              className="prose prose-sm max-w-none text-[#4a3f2c]"
              dangerouslySetInnerHTML={{ __html: estudo.creditos }}
            />
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/estudos"
            className="inline-block bg-[#0f1724] text-white px-6 py-2 rounded-md hover:bg-[#1e293b] transition-all duration-300 text-sm"
          >
            ⬅️ Voltar aos Estudos
          </Link>
        </div>
      </motion.article>
    </main>
  );
}
