"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";

export default function PropositoPage() {
  return (
    <main className="bg-[#f8fafc] min-h-screen">
      {/* === HERO === */}
      <HeroSection
        titulo="Propósito"
        subtitulo="Tudo existe para a glória de Deus."
        versiculo="Colossenses 3:23"
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
            O Propósito do “Tudo Por Ele”
          </h2>

          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            O projeto <strong>“Tudo Por Ele”</strong> nasce com o objetivo de
            glorificar a Deus por meio do ensino fiel das Escrituras e da
            divulgação da <em>teologia reformada</em>. Cremos que toda a verdade
            vem de Deus e que Ele é o centro de todas as coisas —{" "}
            <strong>Dele, por Ele e para Ele são todas as coisas</strong>.
          </p>

          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            Nosso propósito é ajudar cristãos a crescerem no conhecimento
            bíblico sólido, discernindo a sã doutrina em meio a um tempo de
            confusão espiritual. Cada artigo, estudo ou reflexão é produzido com
            reverência, buscando exaltar a Cristo, a suficiência da graça e a
            autoridade da Palavra.
          </p>

          <blockquote className="border-l-4 border-[#0f1724] pl-4 italic text-gray-600 my-8">
            “Tudo o que fizerem, façam de todo o coração, como para o Senhor, e
            não para os homens.” — Colossenses 3:23
          </blockquote>

          <p className="text-gray-700 leading-relaxed text-lg">
            Que este espaço sirva como um convite à adoração verdadeira, à
            reflexão profunda e à comunhão sincera com o Deus da Palavra. Tudo
            é por Ele, tudo vem Dele e tudo é para Ele.
          </p>
        </motion.div>
      </section>
    </main>
  );
}
