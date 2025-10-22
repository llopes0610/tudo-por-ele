"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";

export default function EstudosPage() {
  return (
    <main className="bg-[#f8fafc] min-h-screen">
      {/* === HERO === */}
      <HeroSection
        titulo="Estudos"
        subtitulo="Aprofunde-se nas doutrinas da graça e na verdade das Escrituras."
        versiculo="2 Timóteo 3:16"
      />

      {/* === CONTEÚDO === */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <h2 className="text-3xl font-serif font-semibold text-[#0f1724] mb-6 text-center">
            Estudos Recentes
          </h2>

          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            Explore estudos e reflexões sobre temas centrais da fé cristã
            reformada — salvação pela graça, soberania de Deus, suficiência das
            Escrituras e a centralidade de Cristo em toda a história da redenção.
          </p>

          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            Cada conteúdo foi elaborado com base nas Escrituras, buscando edificar
            o corpo de Cristo e fortalecer sua fé em meio a um mundo confuso.
            Nossa missão é glorificar a Deus através do ensino sólido, fiel e
            transformador.
          </p>

          <blockquote className="border-l-4 border-[#0f1724] pl-4 italic text-gray-600 my-8">
            “Examinais as Escrituras, porque julgais ter nelas a vida eterna, e são
            elas mesmas que testificam de mim.” — João 5:39
          </blockquote>

          <p className="text-gray-700 leading-relaxed text-lg">
            Que cada estudo sirva para aumentar seu amor pela Palavra e seu
            desejo de viver inteiramente para a glória de Deus.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
