"use client";

import { motion } from "framer-motion";

export default function SectionWrapper({ children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="max-w-5xl mx-auto px-6 py-16"
    >
      {children}
    </motion.section>
  );
}
