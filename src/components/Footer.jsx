"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="bg-[#0f1724] text-gray-300 text-center py-6 border-t border-gray-700"
    >
      <p className="text-sm italic text-gray-400 mb-2">
        “Porque d’Ele, por Ele e para Ele são todas as coisas.” — Romanos 11:36
      </p>
      <p className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
        &copy; 2025 Tudo Por Ele — Teologia Reformada
      </p>
    </motion.footer>
  );
}
